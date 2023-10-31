import { z } from 'zod';

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});
export const bookSchema = z.object({
  _id: z.string(),
  title: z.string(),
  category: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  createdAt: z.string(),
});
export type Task = z.infer<typeof taskSchema>;
export type Book = z.infer<typeof bookSchema>;
