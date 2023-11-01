import zod from 'zod';

export const loginFormSchema = zod.object({
  email: zod
    .string({ required_error: 'Email is required' })
    .email('Please enter a valid Email'),
  password: zod.string({ required_error: 'Password is required' }).min(8),
});
