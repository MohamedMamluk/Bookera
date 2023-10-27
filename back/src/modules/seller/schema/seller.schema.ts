import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ISeller } from 'src/common/interfaces/seller/ISeller.interface';

@Schema({ timestamps: true })
export class Seller implements ISeller {
  @Prop({ default: [] })
  vouchers: string[];

  @Prop({ required: true, unique: true })
  userId: mongoose.Types.ObjectId;

  @Prop({ default: 0 })
  balance: number;
}

export const SellerSchema = SchemaFactory.createForClass(Seller);
