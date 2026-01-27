import ReusableDialog from '@/Components/ReusableComponents/Dialog/ReusableDialog';
import AddItemForm from '@/Items/dialog/form/AddItemForm';
import usePutItem from '@/Items/hooks/use-putItem';
import { FetchItemData } from '@/Items/types/index';


interface UpdateItemDialogProps {
    open: boolean;
    onClose: () => void;
    itemData: FetchItemData | null;
}

export default function AddItemDialog({ open, onClose, itemData }: UpdateItemDialogProps) {
    const {
        item,
        remaining,
        image,
        icon,
        setitem,
        setremaining,
        setimage,
        seticon,
        handleSubmit,
        inputRef,
        errors,
        isPendingUpdateItemMutation,
    } = usePutItem(onClose, () => {}, itemData);

    const handleConfirm = async () => {
        await handleSubmit();
    };

    return (
        <ReusableDialog
            open={open}
            title="Update New Item"
            onClose={onClose}
            onConfirm={handleConfirm}
            confirmText="Update"
            cancelText="Cancel"
            isLoading={isPendingUpdateItemMutation}
        >
            <AddItemForm
                item={item}
                remaining={remaining}
                image={image}
                icon={icon}
                errors={errors}
                isLoading={isPendingUpdateItemMutation}
                onItemChange={setitem}
                onRemainingChange={setremaining}
                onImageChange={setimage}
                onIconChange={seticon}
                inputRef={inputRef}
            />
        </ReusableDialog>
    );
}