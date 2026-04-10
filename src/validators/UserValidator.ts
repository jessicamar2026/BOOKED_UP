import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.email(),
  passwordHash: z.string().min(8),
  displayName: z.string().min(2),
  role: z.enum(['admin', 'user']).default('user'),
});
