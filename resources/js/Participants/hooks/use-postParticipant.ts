import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postParticipants } from '@/Participants/api/postSavedParticipant';
import { ParticipantsFormSchema, ParticipantsForm } from '@/Participants/validations/use-ParticipantsFormStoreValidationSchema';
import Swal from 'sweetalert2';

export default function usePostParticipant(onClose: () => void, onSuccess?: () => void) {
    const [fullname, setFullname] = useState('');
    const [position, setPosition] = useState('');
    const [errors, setErrors] = useState<Partial<Record<keyof ParticipantsForm, string>>>({});
    
    const inputRef = useRef<HTMLInputElement>(null);
    const queryClient = useQueryClient();

    const createParticipantMutation = useMutation({
        mutationFn: postParticipants,
        onSuccess: (data) => {
            if (data.success) {
                Swal.fire({
                    title: 'Success!',
                    text: data.message,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                
                // Reset form
                setFullname('');
                setPosition('');
                setErrors({});
                
                // Refresh data
                queryClient.invalidateQueries({ queryKey: ['FetchParticipants'] });
                
                onClose();
                onSuccess?.();
            }
        },
        onError: (error: any) => {
            console.error('Error creating participant:', error);
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'Failed to create participant',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });

    const handleSubmit = async () => {
        try {
            // Validate form data
            const validatedData = ParticipantsFormSchema.parse({
                fullname,
                position,
            });

            setErrors({});
            
            // Submit data
            await createParticipantMutation.mutateAsync(validatedData);
            
        } catch (error: any) {
            if (error.errors) {
                // Zod validation errors
                const formattedErrors: Partial<Record<keyof ParticipantsForm, string>> = {};
                error.errors.forEach((err: any) => {
                    if (err.path && err.path.length > 0) {
                        formattedErrors[err.path[0] as keyof ParticipantsForm] = err.message;
                    }
                });
                setErrors(formattedErrors);
            }
        }
    };

    return {
        fullname,
        position,
        setFullname,
        setPosition,
        handleSubmit,
        inputRef,
        errors,
        isPendingCreateParticipantMutation: createParticipantMutation.isPending,
    };
}