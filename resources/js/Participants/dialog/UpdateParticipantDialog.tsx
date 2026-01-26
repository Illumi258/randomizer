import ReusableDialog from '@/Components/ReusableComponents/Dialog/ReusableDialog';
import AddParticipantsForm from '@/Participants/dialog/form/AddParticipantsForm';
import usePutParticipant from '@/Participants/hooks/use-putParticipant';
import { FetchParticipantsData } from '@/Participants/types';

interface UpdateParticipantDialogProps {
    open: boolean;
    onClose: () => void;
    participantData: FetchParticipantsData | null;
}

export default function UpdateParticipantDialog({ open, onClose, participantData }: UpdateParticipantDialogProps) {
    const {
        fullname,
        position,
        setFullname,
        setPosition,
        handleSubmit,
        inputRef,
        errors,
        isPendingUpdateParticipantMutation,
    } = usePutParticipant(onClose, () => {}, participantData);

    const handleConfirm = async () => {
        await handleSubmit();
    };

    return (
        <ReusableDialog
            open={open}
            title="Update Participant"
            onClose={onClose}
            onConfirm={handleConfirm}
            confirmText="Update"
            cancelText="Cancel"
            isLoading={isPendingUpdateParticipantMutation}
        >
            <AddParticipantsForm
                fullname={fullname}
                position={position}
                errors={errors}
                isLoading={isPendingUpdateParticipantMutation}
                onParticipantsChange={setFullname}
                onPositionChange={setPosition}
                inputRef={inputRef}
            />
        </ReusableDialog>
    );
}