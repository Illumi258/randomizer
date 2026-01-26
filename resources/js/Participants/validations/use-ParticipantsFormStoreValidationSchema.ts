import { z } from 'zod';

export const ParticipantsFormSchema = z.object({
  fullname: z.string().min(1, 'Full name is required').max(100, 'Full name cannot exceed 100 characters'),
  position: z.string().min(1, 'Position is required').max(50, 'Position cannot exceed 50 characters'),
});

export type ParticipantsForm = z.infer<typeof ParticipantsFormSchema>;