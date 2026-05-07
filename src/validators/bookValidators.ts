import { z } from "zod";

export const BookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  pageCount: z.number().int().min(1),
  genre: z.string().optional(),
  coverImageURL: z.string().optional(),
  publishedYear: z.number().int().optional()
});