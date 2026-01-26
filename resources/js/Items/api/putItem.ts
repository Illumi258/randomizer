import api from '@/lib/axios';
import { route } from 'ziggy-js';
import { SavingItemsData } from '@/Items/types/index';

interface SavingResponse {
  success: boolean;
  message: string;
  data: SavingItemsData;
}

export const putItems = async(payload: SavingItemsData & { id: number }): Promise<SavingResponse> => {
    const formData = new FormData();
    formData.append('item', payload.item);
    formData.append('remaining', payload.remaining.toString());
    if (payload.image) {
        formData.append('image', payload.image);
    }
    formData.append('_method', 'PUT');

    const response = await api.post(route('items.UpdateItems', { id: payload.id }), formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}