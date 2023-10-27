import mongoose from 'mongoose';

export interface ISeller {
  vouchers: string[];
  balance: number;
  userId: mongoose.Types.ObjectId;
}
