import api from '@/lib/axios';
import { route } from 'ziggy-js';

interface DeleteResponse {
  success: boolean;
  message: string;
}

export const deleteItem = async(id: number): Promise<DeleteResponse> => {
    const response = await api.delete(route('items.DestroyItem', { id }));
    return response.data;
}
