import { z } from 'zod';

export const CreateUserSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().min(1).max(20),
  email: z.string().email(),
  passwordHash: z.string().min(8),
  displayName: z.string().min(2),
  role: z.enum(['admin', 'user']).default('user'),
});

export const UpdateUserEmailSchema = z.object({
  email: z.email(),
});

export const LogInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
