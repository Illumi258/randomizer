
import { TextField, Box } from '@mui/material';
import { AddParticipantsFormProps } from '@/Participants/types/AddParticipants'


export default function AddParticipantsForm({
    fullname,
    position,
    errors,
    isLoading = false,
    onParticipantsChange,
    onPositionChange,
    inputRef,
}: AddParticipantsFormProps) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
            {/* Item Name */}
            <TextField
                inputRef={inputRef}
                label="Full Name"
                placeholder="Enter Full name"
                value={fullname}
                onChange={(e) => onParticipantsChange(e.target.value)}
                error={!!errors?.fullname}
                helperText={errors?.fullname}
                fullWidth
                disabled={isLoading}
                variant="outlined"
                size="medium"
            />

            {/* Remaining */}
            <TextField
                label="Position"
                placeholder="Enter Position"
                value={position}
                onChange={(e) => onPositionChange(e.target.value)}
                error={!!errors?.position}
                helperText={errors?.position}
                fullWidth
                disabled={isLoading}
                variant="outlined"
                size="medium"
            />
        </Box>
    );
}
