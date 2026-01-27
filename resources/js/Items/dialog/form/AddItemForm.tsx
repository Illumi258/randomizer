import React, { useState } from 'react';
import { TextField, Box, Paper, Typography, IconButton, FormControl, InputLabel, Select, MenuItem, Button, LinearProgress, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { ItemForm } from '@/Items/validations/use-ItemStoreValidationSchema';
import { removeImageBackground } from '@/utils/backgroundRemoval';

interface AddItemFormProps {
    item: string;
    remaining: number;
    image: File | null;
    icon: string;
    errors?: Partial<Record<keyof ItemForm, string>>;
    isLoading?: boolean;
    onItemChange: (value: string) => void;
    onRemainingChange: (value: number) => void;
    onImageChange: (file: File | null) => void;
    onIconChange: (value: string) => void;
    inputRef?: React.RefObject<HTMLInputElement>;
}

// Icon options from Raffle page
const ICON_OPTIONS = [
    { value: 'bx-headphone', label: 'Headphone (Wireless Earbuds)', icon: 'bx bx-headphone' },
    { value: 'bxs-battery-charging', label: 'Battery (Power Bank)', icon: 'bx bxs-battery-charging' },
    { value: 'bx-volume-full', label: 'Speaker (BT Speaker)', icon: 'bx bx-volume-full' },
    { value: 'bx-wind', label: 'Wind (Handheld Fan)', icon: 'bx bx-wind' },
    { value: 'bx-timer', label: 'Timer (Air Fryer)', icon: 'bx bx-timer' },
];

export default function AddItemForm({
    item,
    remaining,
    image,
    icon,
    errors,
    isLoading = false,
    onItemChange,
    onRemainingChange,
    onImageChange,
    onIconChange,
    inputRef,
}: AddItemFormProps) {
    const [isProcessingBg, setIsProcessingBg] = useState(false);
    const [bgRemovalProgress, setBgRemovalProgress] = useState(0);
    const [bgRemovalError, setBgRemovalError] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setBgRemovalError(null);
        onImageChange(file);
    };

    const handleRemoveBackground = async () => {
        if (!image) return;

        setIsProcessingBg(true);
        setBgRemovalProgress(0);
        setBgRemovalError(null);

        try {
            const processedImage = await removeImageBackground(image, {
                onProgress: (progress) => {
                    setBgRemovalProgress(Math.round(progress * 100));
                },
                quality: 'medium'
            });
            
            onImageChange(processedImage);
        } catch (error) {
            setBgRemovalError('Failed to remove background. Please try again.');
            console.error('Background removal error:', error);
        } finally {
            setIsProcessingBg(false);
            setBgRemovalProgress(0);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
            {/* Item Name */}
            <TextField
                inputRef={inputRef}
                label="Item Name"
                placeholder="Enter item name"
                value={item}
                onChange={(e) => onItemChange(e.target.value)}
                error={!!errors?.item}
                helperText={errors?.item}
                fullWidth
                disabled={isLoading}
                variant="outlined"
                size="medium"
            />

            {/* Remaining */}
            <TextField
                label="Remaining Quantity"
                type="number"
                placeholder="Enter quantity"
                value={remaining}
                onChange={(e) => onRemainingChange(Number(e.target.value))}
                error={!!errors?.remaining}
                helperText={errors?.remaining}
                fullWidth
                disabled={isLoading}
                variant="outlined"
                size="medium"
            />

            {/* Icon Selection */}
            <FormControl fullWidth variant="outlined" size="medium">
                <InputLabel>Select Icon</InputLabel>
                <Select
                    value={icon}
                    onChange={(e) => onIconChange(e.target.value)}
                    label="Select Icon"
                    disabled={isLoading}
                >
                    <MenuItem value="">
                        <em>No Icon</em>
                    </MenuItem>
                    {ICON_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <i className={option.icon} style={{ fontSize: '18px' }} />
                                {option.label}
                            </Box>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Image Upload */}
            <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, color: '#333' }}>
                    Item Image
                </Typography>
                
                <Paper
                    variant="outlined"
                    sx={{
                        p: 2,
                        textAlign: 'center',
                        border: '2px dashed #ccc',
                        borderRadius: 2,
                        backgroundColor: '#fafafa',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            borderColor: '#1976d2',
                            backgroundColor: '#f0f7ff',
                        },
                    }}
                >
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={isLoading}
                        style={{ display: 'none' }}
                        id="image-input"
                    />
                    <label htmlFor="image-input" style={{ cursor: 'pointer', display: 'block' }}>
                        <CloudUploadIcon sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
                        <Typography variant="body2" sx={{ color: '#666' }}>
                            Click to upload
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#999' }}>
                            PNG, JPG, GIF up to 2MB
                        </Typography>
                    </label>
                </Paper>

                {/* Image Preview */}
                {image && (
                    <Box sx={{ mt: 2 }}>
                        <Paper
                            sx={{
                                p: 1.5,
                                backgroundColor: '#f5f5f5',
                                borderRadius: 1,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            <Box
                                component="img"
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                sx={{
                                    maxWidth: 80,
                                    maxHeight: 80,
                                    borderRadius: 1,
                                    objectFit: 'cover',
                                }}
                            />
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {image.name}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#999' }}>
                                    {(image.size / 1024).toFixed(2)} KB
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    startIcon={<AutoFixHighIcon />}
                                    onClick={handleRemoveBackground}
                                    disabled={isLoading || isProcessingBg}
                                    sx={{ minWidth: 'auto' }}
                                >
                                    Remove BG
                                </Button>
                                <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => onImageChange(null)}
                                    disabled={isLoading || isProcessingBg}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Paper>

                        {/* Background Removal Progress */}
                        {isProcessingBg && (
                            <Box sx={{ mt: 1 }}>
                                <Typography variant="caption" sx={{ color: '#666', mb: 0.5, display: 'block' }}>
                                    Removing background... {bgRemovalProgress}%
                                </Typography>
                                <LinearProgress 
                                    variant="determinate" 
                                    value={bgRemovalProgress} 
                                    sx={{ height: 4, borderRadius: 2 }}
                                />
                            </Box>
                        )}

                        {/* Background Removal Error */}
                        {bgRemovalError && (
                            <Alert severity="error" sx={{ mt: 1 }}>
                                {bgRemovalError}
                            </Alert>
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    );
}
