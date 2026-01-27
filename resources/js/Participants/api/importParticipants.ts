import api from '@/lib/axios';
import { route } from 'ziggy-js';

interface ImportResponse {
  success: boolean;
  message: string;
  imported: number;
  errors: string[];
}

export const importParticipants = async (file: File): Promise<ImportResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post(route('participants.ImportParticipants'), formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    
    return response.data;
};