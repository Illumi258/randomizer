import { ParticipantsForm } from '@/Participants/validations/use-ParticipantsFormStoreValidationSchema';

export interface AddParticipantsFormProps {
    fullname: string;
    position: string;
    errors?: Partial<Record<keyof ParticipantsForm, string>>;
    isLoading?: boolean;
    onParticipantsChange: (value: string) => void;
    onPositionChange: (value: number) => void;
    onImageChange: (file: File | null) => void;
    inputRef?: React.RefObject<HTMLInputElement>;
}