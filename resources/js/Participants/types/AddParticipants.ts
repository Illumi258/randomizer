import { ParticipantsForm } from '@/Participants/validations/use-ParticipantsFormStoreValidationSchema';

export interface AddParticipantsFormProps {
    fullname: string;
    position: string;
    errors?: Partial<Record<keyof ParticipantsForm, string>>;
    isLoading?: boolean;
    onParticipantsChange: (value: string) => void;
    onPositionChange: (value: string) => void;
    inputRef?: React.RefObject<HTMLInputElement>;
}

export interface SavingParticipantsData {
    fullname: string;
    position: string;
}