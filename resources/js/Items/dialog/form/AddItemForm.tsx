import React from 'react';
import { TextField, Box, Paper, Typography, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { ItemForm } from '@/Items/validations/use-ItemStoreValidationSchema';

interface AddItemFormProps {
    item: string;
    remaining: number;
    image: File | null;
    errors?: Partial<Record<keyof ItemForm, string>>;
    isLoading?: boolean;
    onItemChange: (value: string) => void;
    onRemainingChange: (value: number) => void;
    onImageChange: (file: File | null) => void;
    inputRef?: React.RefObject<HTMLInputElement>;
}

export default function AddItemForm({
    item,
    remaining,
    image,
    errors,
    isLoading = false,
    onItemChange,
    onRemainingChange,
    onImageChange,
    inputRef,
}: AddItemFormProps) {
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onImageChange(file);
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
                            <IconButton
                                size="small"
                                color="error"
                                onClick={() => onImageChange(null)}
                                disabled={isLoading}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Paper>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
