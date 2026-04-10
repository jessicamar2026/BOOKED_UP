import { z } from 'zod';

export const GetClubSchema = z.object({
  clubName: z.string().min(3).optional(),
  joinCode: z.string().min(8),
});
