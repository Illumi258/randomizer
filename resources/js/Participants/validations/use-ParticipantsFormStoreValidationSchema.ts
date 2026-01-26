import { z } from 'zod';

export const storeParticipantsSchema = z.object({
  fullname: z.string().min(1, 'FullName is required!'),
  position: z.number().min(1, 'Position is required!'),
});

export type ParticipantsForm = z.infer<typeof storeParticipantsSchema>;