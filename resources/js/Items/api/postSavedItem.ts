import api from '@/lib/axios';
import { route } from 'ziggy-js';
import { SavingItemsData } from '@/Items/types/index';

interface SavingResponse {
  success: boolean;
  message: string;
  data: SavingItemsData;
}

export const postItems = async(payload: SavingItemsData): Promise<SavingResponse> => {
    const formData = new FormData();
    formData.append('item', payload.item);
    formData.append('remaining', payload.remaining.toString());
    if (payload.image) {
        formData.append('image', payload.image);
    }
    if (payload.icon) {
        formData.append('icon', payload.icon);
    }

    const response = await api.post(route('items.SaveItems'), formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}