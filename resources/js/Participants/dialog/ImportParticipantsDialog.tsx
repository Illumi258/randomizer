import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import useImportParticipants from '@/Participants/hooks/use-importParticipants';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ImportParticipantsDialog({ open, onClose }: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { importParticipantsMutation, isPendingImport } = useImportParticipants();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setSelectedFile(file);
      } else {
        alert('Please select a CSV file');
        event.target.value = '';
      }
    }
  };

  const handleImport = () => {
    if (selectedFile) {
      importParticipantsMutation(selectedFile, {
        onSuccess: () => {
          setSelectedFile(null);
          onClose();
        },
      });
    }
  };

  const handleClose = () => {
    if (!isPendingImport) {
      setSelectedFile(null);
      onClose();
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Import Participants</DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2 }}>
          <Alert severity="info" sx={{ mb: 3 }}>
            Upload a CSV file with columns: Full Name, Position
          </Alert>

          <Paper
            sx={{
              border: '2px dashed #ccc',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'action.hover',
              },
            }}
            onClick={handleUploadClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            
            <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            
            {selectedFile ? (
              <Box>
                <Typography variant="h6" color="primary">
                  {selectedFile.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </Typography>
              </Box>
            ) : (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Click to select CSV file
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  or drag and drop your file here
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isPendingImport}>
          Cancel
        </Button>
        <Button
          onClick={handleImport}
          variant="contained"
          disabled={!selectedFile || isPendingImport}
        >
          {isPendingImport ? 'Importing...' : 'Import'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}