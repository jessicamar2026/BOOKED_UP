import { z } from 'zod';

export const ClubMemberSchema = z.object({
  clubMemberId: z.string(),
  role: z.enum(['admin', 'non-admin']),
});
