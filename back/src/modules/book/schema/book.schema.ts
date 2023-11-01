import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/modules/user/schema/user.schema';

export enum Category {
  HISTORY = 'HISTORY',
  FICTION = 'FICTION',
  NON_FICTION = 'NON_FICTION',
  ROMANCE = 'ROMANCE',
  DRAMA = 'DRAMA',
  FINANCE = 'FINANCE',
}

@Schema({ timestamps: true })
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  cover: string;

  @Prop({ required: true })
  link: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  stock: number;

  @Prop({ required: true, enum: Category })
  category: Category;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  sellerId: mongoose.Schema.Types.ObjectId;
}
export const BookSchema = SchemaFactory.createForClass(Book);
