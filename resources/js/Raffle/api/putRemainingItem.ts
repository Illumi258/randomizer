
import api from '@/lib/axios';
import { route } from 'ziggy-js';

interface UpdateRemainingItemData {
    id: number;
}

export const updateRemainingItem = async (data: UpdateRemainingItemData): Promise<any> => {
    console.log('API call - updateRemainingItem with data:', data);
    const url = route('UpdateRemaining');
    console.log('API URL:', url);
    
    try {
        const response = await api.put(url, data);
        console.log('API response:', response.data);
        return response.data;
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
};