import { Module } from '@nestjs/common';
import { BooksBoughtService } from './books_bought.service';
import { BooksBoughtController } from './books_bought.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksBought, BooksBoughtSchema } from './schema/books_bought';

@Module({
  controllers: [BooksBoughtController],
  providers: [BooksBoughtService],
  imports: [
    MongooseModule.forFeature([
      { name: BooksBought.name, schema: BooksBoughtSchema },
    ]),
  ],
  exports: [BooksBoughtService],
})
export class BooksBoughtModule {}
