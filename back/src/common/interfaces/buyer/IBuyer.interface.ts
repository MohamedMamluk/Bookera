import mongoose from 'mongoose';

export interface IBuyer {
  books_bought: string[];
  userId: mongoose.Types.ObjectId;
}
