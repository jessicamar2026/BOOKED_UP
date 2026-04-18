import { z } from 'zod';

export const RegistrationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  password: z.string().min(8).max(64),
  displayName: z.string(),
});

export type RegistrationBody = z.infer<typeof RegistrationSchema>;
