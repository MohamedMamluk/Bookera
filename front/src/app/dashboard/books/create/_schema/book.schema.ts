import zod from 'zod';
export type Categories =
  | 'HISTORY'
  | 'FICTION'
  | 'NON_FICTION'
  | 'ROMANCE'
  | 'DRAMA'
  | 'FINANCE';
export const bookSchema = zod.object({
  title: zod.string({ required_error: 'Title is missing' }).min(1),
  category: zod.enum(
    ['HISTORY', 'FICTION', 'NON_FICTION', 'ROMANCE', 'DRAMA', 'FINANCE'],
    { required_error: 'Category is missing' }
  ),
  description: zod
    .string({ required_error: 'Description is missing' })
    .trim()
    .min(20, 'Description is too short, write at least 20 characters'),
  author: zod.string({ required_error: 'Author is missing' }).min(1),
  price: zod
    .string({ required_error: 'Price is missing' })
    .min(1, 'Please provide a positive number'),
  stock: zod
    .string({ required_error: 'Stock is missing' })
    .min(1, 'Please provide a positive number'),
  link: zod
    .string({ required_error: 'File is missing' })
    .min(1, 'File is missing'),
  cover: zod
    .string({ required_error: 'File is missing' })
    .min(1, 'File is missing'),
});

export type BookSchema = zod.infer<typeof bookSchema>;
