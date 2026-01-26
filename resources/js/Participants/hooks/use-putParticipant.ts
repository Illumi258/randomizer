import { useRef, useState, useEffect } from "react"
import { useDynamicMutation } from '@/hooks/useDynamicMutation';
import { useToast } from "@/utils/use-toast";

import { putParticipants } from "@/Participants/api/putParticipant";
import { FetchParticipantsData, SavingParticipantsData } from '@/Participants/types';
import { useParticipantsStore } from '@/Participants/store/useParticipantsStore';
import { ParticipantsFormSchema, ParticipantsForm } from '@/Participants/validations/use-ParticipantsFormStoreValidationSchema';
import { HandleRequestError } from "@/utils/handleRequestError";

export default function usePutParticipant(
    onCloseDialog: () => void, 
    onReOpenDialog: () => void,
    initialData?: FetchParticipantsData | null 
){
    const {showToast} = useToast();
    const inputRef = useRef<HTMLInputElement>(null);

    const {fullname, position, setFullname, setPosition, resetForm} = useParticipantsStore();

    const fetchSavings = ['FetchParticipants'];

    useEffect(() => {
        if (initialData) {
            setFullname(initialData.fullname);
            setPosition(initialData.position);
        } else {
            resetForm();
        }
    }, [initialData, setFullname, setPosition, resetForm]);

    const [errors, setErrors] = useState<Partial<Record<keyof ParticipantsForm, string>>>();

    const {
        mutate: UpdateParticipantMutation,
        isPending: isPendingUpdateParticipantMutation
    } = useDynamicMutation({
        mutationKey: fetchSavings,
        mutationFn: (payload: SavingParticipantsData & { id: number}) => putParticipants(payload),
        onSuccess: () => {
            showToast({
                message: 'Participant updated successfully',
                type: 'success'
            });
            resetForm();
            setErrors({});
            inputRef.current?.focus();
            onCloseDialog();
        },
        onError: (error) => {
            HandleRequestError(error, 'Failed to edit participant please contact the admin!',
                onCloseDialog,
                onReOpenDialog,
            );
        }, 
    });

    const handleSubmit = async () => {
        if (!initialData?.id) {
            showToast({
                message: 'Participant ID is missing',
                type: 'error'
            });
            return;
        }

        const result = ParticipantsFormSchema.safeParse({ fullname, position });
        if (!result.success) {
            const fieldErrors: typeof errors = {};
            result.error.issues.forEach((err: any) => {
                const field = err.path[0] as keyof ParticipantsForm;
                fieldErrors[field] = err.message;
            });
            setErrors(fieldErrors);
            return;
        }
        UpdateParticipantMutation({ ...result.data, id: initialData?.id });    
    };

    return {
        fullname,
        position,
        setFullname,
        setPosition,
        handleSubmit,
        inputRef,
        errors,
        isPendingUpdateParticipantMutation
    };
}