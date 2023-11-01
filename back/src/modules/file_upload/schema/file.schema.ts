import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
@Schema({ timestamps: true })
export class File {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  link: string;
}

export type FileDocument = HydratedDocument<File>;

export const FileSchema = SchemaFactory.createForClass(File);
