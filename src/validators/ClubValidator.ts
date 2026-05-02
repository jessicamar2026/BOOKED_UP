import { z } from 'zod';

export const CreateClubSchema = z.object({
  clubName: z.string().min(3),
  joinCode: z.string().min(8).optional(),
  userId: z.string(),
  visibility: z.enum(['private', 'public', 'invite only']).default('private'),
  maxMembers: z.number(),
});

export const UpdateClubNameSchema = z.object({
  clubName: z.string(),
});

export const UpdateJoinCodeSchema = z.object({
  joinCode: z.string(),
});

export const UpdateClubVisibilitySchema = z.object({
  visibility: z.enum(['private', 'public', 'invite only']),
});

export const UpdateMaxMembersSchema = z.object({
  maxMembers: z.number().min(2),
});
