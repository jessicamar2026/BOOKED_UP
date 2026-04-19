import { z } from 'zod';

export const CreateClubSchema = z.object({
  clubId: z.string(),
  clubName: z.string().min(3),
  joinCode: z.string().min(8).optional(),
  createdByUser: z.string(),
  visibility: z.enum(['private', 'public', 'invite only']).default('private'),
  maxMembers: z.number(),
  createdAt: z.date(),
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
