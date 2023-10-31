import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Book } from 'src/modules/book/schema/book.schema';
import { User } from 'src/modules/user/schema/user.schema';

@Schema({ timestamps: true })
export class BooksSold {
  @Prop({ required: true, ref: User.name })
  sellerId: mongoose.Schema.Types.ObjectId;
  @Prop({ required: true, ref: Book.name })
  bookId: mongoose.Schema.Types.ObjectId;
}

export type BooksSoldDocument = HydratedDocument<BooksSold>;
export const BooksSoldSchema = SchemaFactory.createForClass(BooksSold);
