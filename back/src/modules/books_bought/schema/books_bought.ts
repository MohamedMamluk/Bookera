import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Book } from 'src/modules/book/schema/book.schema';

@Schema({ timestamps: true })
export class BooksBought {
  @Prop({ required: true })
  buyerId: mongoose.Schema.Types.ObjectId;
  @Prop({ required: true, ref: Book.name })
  book: mongoose.Schema.Types.ObjectId;
}

export type BooksBoughtDocument = HydratedDocument<BooksBought>;
export const BooksBoughtSchema = SchemaFactory.createForClass(BooksBought);
