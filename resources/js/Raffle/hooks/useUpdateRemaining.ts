import { useDynamicMutation } from '@/hooks/useDynamicMutation';
import { updateRemainingItem } from '@/Raffle/api/putRemainingItem';
import { useToast } from "@/utils/use-toast";

export default function useUpdateRemaining(){
    const { showToast } = useToast();

    const fetchItems = [
        'FetchItems'
    ];

    const {
        mutate: updateRemaining,
        isPending: isUpdatingRemaining
    } = useDynamicMutation({
        mutationKey: fetchItems,
        mutationFn: updateRemainingItem,
        onSuccess: () => {
            showToast({
                message: 'Item remaining updated!',
                type: 'success',
            });
        },
        onError: () => {
            showToast({
                message: 'Failed updating remaining items',
                type: 'error',
            });
        },
    });

    return {
        updateRemaining,
        isUpdatingRemaining,
    };
}