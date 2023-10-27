import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { IBuyer } from 'src/common/interfaces/buyer/IBuyer.interface';
@Schema({ timestamps: true })
export class Buyer implements IBuyer {
  @Prop({ default: [] })
  books_bought: string[];
  @Prop({ required: true, unique: true })
  userId: mongoose.Types.ObjectId;
}

export const BuyerSchema = SchemaFactory.createForClass(Buyer);
