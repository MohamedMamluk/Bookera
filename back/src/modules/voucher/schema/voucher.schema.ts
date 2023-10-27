import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/modules/user/schema/user.schema';
@Schema({ timestamps: true })
export class Voucher {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  percentage: number;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  sellerId: mongoose.Schema.Types.ObjectId;
}

export const VoucherSchema = SchemaFactory.createForClass(Voucher);
