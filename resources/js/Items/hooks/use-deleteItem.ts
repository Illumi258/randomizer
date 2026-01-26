import { useDynamicMutation } from '@/hooks/useDynamicMutation';
import { useToast } from "@/utils/use-toast";
import { deleteItem } from "@/Items/api/deleteItem";
import { HandleRequestError } from "@/utils/handleRequestError";

export default function useDeleteItem() {
    const { showToast } = useToast();

    const {
        mutate: deleteItemMutation,
        isPending: isPendingDelete
    } = useDynamicMutation({
        mutationKey: ['Fetchitems'],
        mutationFn: (id: number) => deleteItem(id),
        onSuccess: () => {
            showToast({
                message: 'Item deleted successfully',
                type: 'success'
            });
        },
        onError: (error) => {
            HandleRequestError(
                error, 
                'Failed to delete item. Please contact the admin!',
                () => {},
                () => {}
            );
        },
    });

    return {
        deleteItemMutation,
        isPendingDelete
    };
}
