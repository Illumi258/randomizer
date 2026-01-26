import api from '@/lib/axios';
import { route } from 'ziggy-js';
import { SavingParticipantsData } from '@/Participants/types/AddParticipants';

interface SavingResponse {
  success: boolean;
  message: string;
  data: SavingParticipantsData;
}

export const postParticipants = async(payload: SavingParticipantsData): Promise<SavingResponse> => {
    const response = await api.post(route('participants.SaveParticipants'), {
        fullname: payload.fullname,
        position: payload.position,
    });
    return response.data;
}