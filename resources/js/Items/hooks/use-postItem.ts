import { useRef, useState } from "react"
import { useQueryClient } from '@tanstack/react-query';
import { useDynamicMutation } from '@/hooks/useDynamicMutation';
import { useToast } from "@/utils/use-toast";

import { postItems } from "@/Items/api/postSavedItem"; // FROM API
import { SavingItemsData, useItemsStore }  from '@/Items/types/index'; // FROM TYPES
import { storeItemSchema, ItemForm } from '@/Items/validations/use-ItemStoreValidationSchema'; // FROM SCHEMA
import { HandleRequestError } from "@/utils/handleRequestError";




export default function usePostItem(onCloseDialog: () => void, onReOpenDialog: () => void){
    const {showToast} = useToast();
    const queryClient = useQueryClient();
    const inputRef = useRef<HTMLInputElement>(null);

    const {item, remaining, image, icon, setitem, setremaining, setimage, seticon, resetForm} = useItemsStore();

    const fetchSavings = [
        'FetchItems',
        'FetchItemsInFrontEnd'
    ];

    const [errors, setErrors] = useState<Partial<Record<keyof ItemForm, string>>>();

    const {
        mutate: CreateItemMutation,
        isPending: isPendingCreateItemMutation
    } = useDynamicMutation({
        mutationKey: fetchSavings,
        mutationFn: (payload: SavingItemsData) => postItems(payload),
        onSuccess: () => {
            showToast({
                message: 'Item added successfully',
                type: 'success'
            });
            resetForm();
            queryClient.invalidateQueries({ queryKey: fetchSavings });
            
            setErrors({});
            inputRef.current?.focus();
            onCloseDialog();
        },
        onError: (error) => {
            HandleRequestError(error, 'Failed to add item please contact the admin!',
                onCloseDialog,
                onReOpenDialog,
            );
        }, 
    });

    const handleSubmit = async () => {
        const result = storeItemSchema.safeParse({ item, remaining, image, icon });
        if (!result.success) {
            const fieldErrors: typeof errors = {};
            result.error.issues.forEach((err) => {
                const field = err.path[0] as keyof ItemForm;
                fieldErrors[field] = err.message;
            });
            setErrors(fieldErrors);
            return;
        }
        CreateItemMutation(result.data);    
    };

    return {
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
        isPendingCreateItemMutation
    };
}
