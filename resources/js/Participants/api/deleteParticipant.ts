import api from '@/lib/axios';
import { route } from 'ziggy-js';

interface DeleteResponse {
  success: boolean;
  message: string;
}

export const deleteParticipant = async (id: number): Promise<DeleteResponse> => {
    const response = await api.delete(route('participants.DestroyParticipant', { id }));
    return response.data;
}