import { Module } from '@nestjs/common';
import { BooksSoldService } from './books_sold.service';
import { BooksSoldController } from './books_sold.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksSold, BooksSoldSchema } from './schema/books_sold.schema';

@Module({
  controllers: [BooksSoldController],
  providers: [BooksSoldService],
  imports: [
    MongooseModule.forFeature([
      { name: BooksSold.name, schema: BooksSoldSchema },
    ]),
  ],
  exports: [BooksSoldService],
})
export class BooksSoldModule {}
