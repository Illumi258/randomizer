import ReusableDialog from '@/Components/ReusableComponents/Dialog/ReusableDialog';
import AddItemForm from '@/Items/dialog/form/AddItemForm';
import usePostItem from '@/Items/hooks/use-postItem';

interface AddItemDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function AddItemDialog({ open, onClose }: AddItemDialogProps) {
    const {
        item,
        remaining,
        image,
        setitem,
        setremaining,
        setimage,
        handleSubmit,
        inputRef,
        errors,
        isPendingCreateItemMutation,
    } = usePostItem(onClose, () => {});

    const handleConfirm = async () => {
        await handleSubmit();
    };

    return (
        <ReusableDialog
            open={open}
            title="Add New Item"
            onClose={onClose}
            onConfirm={handleConfirm}
            confirmText="Add Item"
            cancelText="Cancel"
            isLoading={isPendingCreateItemMutation}
        >
            <AddItemForm
                item={item}
                remaining={remaining}
                image={image}
                errors={errors}
                isLoading={isPendingCreateItemMutation}
                onItemChange={setitem}
                onRemainingChange={setremaining}
                onImageChange={setimage}
                inputRef={inputRef}
            />
        </ReusableDialog>
    );
}
