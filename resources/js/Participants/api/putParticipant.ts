import api from '@/lib/axios';
import { route } from 'ziggy-js';
import { SavingParticipantsData } from '@/Participants/types/AddParticipants';

interface UpdateResponse {
  success: boolean;
  message: string;
  data: any;
}

export const putParticipants = async(payload: SavingParticipantsData & { id: number }): Promise<UpdateResponse> => {
    const response = await api.put(route('participants.UpdateParticipants', { id: payload.id }), {
        fullname: payload.fullname,
        position: payload.position,
    });
    return response.data;
}