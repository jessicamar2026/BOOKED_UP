import { z } from 'zod';

export const GetClubMemberSchema = z.object({
  userId: z.string(),
  role: z.enum(['admin', 'non-admin']),
});
