import { useDynamicMutation } from '@/hooks/useDynamicMutation';
import { updateRedeemedItem } from '@/Raffle/api/putRedeemItem';
import { useToast } from "@/utils/use-toast";

export default function useRedeemParticipant(){
    const { showToast } = useToast();

    const fetchParticipants = [
        'FetchParticipants',
        'FetchParticipantsInFrontEnd'
    ];

    const {
        mutate: saveWinner,
        isPending: isSavingWinner
    } = useDynamicMutation({
        mutationKey: fetchParticipants,
        mutationFn: updateRedeemedItem,
        onSuccess: () => {
            showToast({
                message: 'Winner saved!',
                type: 'success',
            });
        },
        onError: () => {
            showToast({
                message: 'Failed saving winner',
                type: 'error',
            });
        },
    });

    return {
        saveWinner,
        isSavingWinner,
    };
}