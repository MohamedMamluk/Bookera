import { Roles } from 'src/common/enums/roles.enum';

export interface IUser {
  name: string;
  email: string;
  password: string;
  address: string;
  phone_number: string;
  reset_code?: string | null;
  confirmation_code?: string | null;
  isVerified?: boolean;
  role: Roles;
}
