import { useRef, useState, useEffect } from "react"
import { useDynamicMutation } from '@/hooks/useDynamicMutation';
import { useToast } from "@/utils/use-toast";

import { putItems } from "@/Items/api/putItem"; // FROM API
import { FetchItemData, SavingItemsData, useItemsStore }  from '@/Items/types/index'; // FROM TYPES
import { storeItemSchema, ItemForm } from '@/Items/validations/use-ItemStoreValidationSchema'; // FROM SCHEMA
import { HandleRequestError } from "@/utils/handleRequestError";

export default function usePutItem(
    onCloseDialog: () => void, 
    onReOpenDialog: () => void,
    initialData?: FetchItemData | null 
){
    const {showToast} = useToast();
    const inputRef = useRef<HTMLInputElement>(null);

       const {item, remaining, image, setitem, setremaining, setimage, resetForm} = useItemsStore();

         const fetchSavings = [
        'prize',
        'Fetchitems'
    ];

      useEffect(() => {
        if (initialData) {
            setitem(initialData.item);
            setremaining(initialData.remaining);
            // Note: image from DB is string URL, not File
            // You'll need to handle this differently
        } else {
            resetForm();
        }
    }, [initialData, setitem, setremaining, resetForm]);

    const [errors, setErrors] = useState<Partial<Record<keyof ItemForm, string>>>();

     const {
            mutate: UpdateItemMutation,
            isPending: isPendingUpdateItemMutation
        } = useDynamicMutation({
            mutationKey: fetchSavings,
            mutationFn: (payload: SavingItemsData & { id: number}) => putItems(payload),
            onSuccess: () => {
                showToast({
                    message: 'Item added successfully',
                    type: 'success'
                });
                resetForm();
                setErrors({});
                inputRef.current?.focus();
                onCloseDialog();
            },
            onError: (error) => {
                HandleRequestError(error, 'Failed to edit item please contact the admin!',
                    onCloseDialog,
                    onReOpenDialog,
                );
            }, 
        });

        const handleSubmit = async () => {

        if (!initialData?.id) {
            showToast({
                message: 'Item ID is missing',
                type: 'error'
            });
            return;
        }

        const result = storeItemSchema.safeParse({ item, remaining, image });
        if (!result.success) {
            const fieldErrors: typeof errors = {};
            result.error.issues.forEach((err: any) => {
                const field = err.path[0] as keyof ItemForm;
                fieldErrors[field] = err.message;
            });
            setErrors(fieldErrors);
            return;
        }
        UpdateItemMutation({ ...result.data, id:initialData?.id});    
    };

    return {
        item,
        remaining,
        image,
        setitem,
        setremaining,
        setimage,
        handleSubmit,
        inputRef,
        errors,
        isPendingUpdateItemMutation
    };
}