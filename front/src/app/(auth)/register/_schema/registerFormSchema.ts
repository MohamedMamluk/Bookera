import zod from 'zod';

export const formSchema = zod.object({
  name: zod.string({ required_error: 'Name is required' }).min(1),
  email: zod
    .string({ required_error: 'Email is required' })
    .email('Please enter a valid Email'),
  password: zod
    .string({ required_error: 'Password is required' })
    .min(8, 'Please provide a stronger password that is 8 or more characters'),
  phone_number: zod
    .string({ required_error: 'PhoneNumber is required' })
    .regex(
      /^(010|011|012|015)\d{8}$/,
      'The number must start with 010 or 011 or 012 or 015'
    )
    .length(11, 'Phone Number must be 11 numbers'),
  address: zod.string({ required_error: 'Address is required' }).min(1),
  role: zod.enum(['SELLER', 'BUYER'], { required_error: 'Role is required' }),
});
