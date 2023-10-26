import { IUser } from '../user/IUser.interface';

export interface ISeller extends IUser {
  vouchers?: string;
  balance?: number;
}
