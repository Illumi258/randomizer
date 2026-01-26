import ReusableDialog from '@/Components/ReusableComponents/Dialog/ReusableDialog';
import AddParticipantsForm from '@/Participants/dialog/form/AddParticipantsForm';
import usePostParticipant from '@/Participants/hooks/use-postParticipant';

interface AddParticipantsDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function AddParticipantsDialog({ open, onClose }: AddParticipantsDialogProps) {
    const {
        fullname,
        position,
        setFullname,
        setPosition,
        handleSubmit,
        inputRef,
        errors,
        isPendingCreateParticipantMutation,
    } = usePostParticipant(onClose, () => {});

    const handleConfirm = async () => {
        await handleSubmit();
    };

    return (
        <ReusableDialog
            open={open}
            title="Add New Participant"
            onClose={onClose}
            onConfirm={handleConfirm}
            confirmText="Add Participant"
            cancelText="Cancel"
            isLoading={isPendingCreateParticipantMutation}
        >
            <AddParticipantsForm
                fullname={fullname}
                position={position}
                errors={errors}
                isLoading={isPendingCreateParticipantMutation}
                onParticipantsChange={setFullname}
                onPositionChange={setPosition}
                inputRef={inputRef}
            />
        </ReusableDialog>
    );
}