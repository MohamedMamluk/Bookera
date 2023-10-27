import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Roles } from 'src/common/enums/roles.enum';
import { IUser } from 'src/common/interfaces/user/IUser.interface';

@Schema({ timestamps: true })
export class User implements IUser {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: Roles })
  role: Roles;

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

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function () {
  if (!this.isNew) {
    return;
  }

  const hashedPassword = await bcrypt.hash(this.password, 12);

  this.password = hashedPassword;
});
