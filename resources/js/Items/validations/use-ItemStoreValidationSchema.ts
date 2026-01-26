import { z } from 'zod';

export const storeItemSchema = z.object({
  item: z.string().min(1, 'item is required!'),
  remaining: z.number().min(1, 'Remaining is required!'),
  image: z.instanceof(File).nullable().optional(),
});

export type ItemForm = z.infer<typeof storeItemSchema>;