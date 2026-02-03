import api from '@/lib/axios';
import { route } from 'ziggy-js';
import { FetchParticipantsData } from '@/Participants/types';

export const showRaffleParticipants = async (): Promise<FetchParticipantsData[]> => {

        const url = route('ParticipantsRaffle');
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

export const showWinners = async (): Promise<FetchParticipantsData[]> => {

        const url = route('Winners');
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


