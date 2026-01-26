import { useDynamicMutation } from '@/hooks/useDynamicMutation';
import { useToast } from "@/utils/use-toast";
import { deleteParticipant } from "@/Participants/api/deleteParticipant";
import { HandleRequestError } from "@/utils/handleRequestError";

export default function useDeleteParticipant() {
    const { showToast } = useToast();

    const {
        mutate: deleteParticipantMutation,
        isPending: isPendingDelete
    } = useDynamicMutation({
        mutationKey: ['FetchParticipants'],
        mutationFn: (id: number) => deleteParticipant(id),
        onSuccess: () => {
            showToast({
                message: 'Participant deleted successfully',
                type: 'success'
            });
        },
        onError: (error) => {
            HandleRequestError(
                error, 
                'Failed to delete participant. Please contact the admin!',
                () => {},
                () => {}
            );
        },
    });

    return {
        deleteParticipantMutation,
        isPendingDelete
    };
}