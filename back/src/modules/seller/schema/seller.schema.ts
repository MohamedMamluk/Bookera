import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Roles } from 'src/common/enums/roles.enum';
import { ISeller } from 'src/common/interfaces/seller/ISeller.interface';

@Schema({ timestamps: true })
export class Seller implements ISeller {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Roles.SELLER })
  role: Roles;

  @Prop()
  vouchers: string;

  @Prop({ default: 0 })
  balance: number;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phone_number: string;

  @Prop({ default: null })
  reset_code?: string | null;

  @Prop({ default: null })
  confirmation_code?: string | null;

  @Prop({ default: false })
  isVerified?: boolean;
}

export const SellerSchema = SchemaFactory.createForClass(Seller);

SellerSchema.pre('save', async function () {
  if (!this.isNew) {
    return;
  }

  const hashedPassword = await bcrypt.hash(this.password, 12);

  this.password = hashedPassword;
});
