import api from '@/lib/axios';
import { route } from 'ziggy-js';
import { FetchItemData } from '@/Items/types/index';

export const showRaffleItems = async (): Promise<FetchItemData[]> => {

        const url = route('RaffleItems');
        const response = await api.get(`${url}`);

        
        // Handle new service response format
        if (response.data && response.data.success && response.data.data) {
            return response.data.data;
        } else if (response.data && Array.isArray(response.data)) {
            // Fallback for old format
            return response.data;
        } else {
            console.warn('Unexpected API response structure:', response.data);
            return [];
        }
}