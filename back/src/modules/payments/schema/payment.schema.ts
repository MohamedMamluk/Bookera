import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Book } from 'src/modules/book/schema/book.schema';
import { User } from 'src/modules/user/schema/user.schema';

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

@Schema({ timestamps: true })
export class Payment {
  @Prop({ required: true })
  paymentId: string;

  @Prop({ required: true })
  client_secret: string;

  @Prop({ required: true, enum: PaymentStatus })
  status: PaymentStatus;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  buyer: mongoose.Schema.Types.ObjectId;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  seller: mongoose.Schema.Types.ObjectId;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Book.name,
  })
  book: mongoose.Schema.Types.ObjectId;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
