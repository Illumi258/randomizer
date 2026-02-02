import api from '@/lib/axios';
import { route } from 'ziggy-js';
interface UpdateRedeemedItemData {
    id: number;
    redeemed_item: string;
}

export const updateRedeemedItem = async (data: UpdateRedeemedItemData): Promise<any> => {
    // console.log('API call - updateRedeemedItem with data:', data);
    const url = route('RedeemedItem');
    // console.log('API URL:', url);
        const response = await api.put(url, data);
        return response.data;

};

