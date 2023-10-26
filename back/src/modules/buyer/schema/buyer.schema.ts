import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Roles } from 'src/common/enums/roles.enum';
import { IBuyer } from 'src/common/interfaces/buyer/IBuyer.interface';
@Schema({ timestamps: true })
export class Buyer implements IBuyer {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Roles.BUYER })
  role: Roles;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phone_number: string;

  @Prop({ default: null })
  reset_code: string | null;

  @Prop({ default: null })
  confirmation_code: string | null;

  @Prop({ default: false })
  isVerified: boolean;
}

export const BuyerSchema = SchemaFactory.createForClass(Buyer);

BuyerSchema.pre('save', async function () {
  if (!this.isNew) {
    return;
  }

  const hashedPassword = await bcrypt.hash(this.password, 12);

  this.password = hashedPassword;
});
