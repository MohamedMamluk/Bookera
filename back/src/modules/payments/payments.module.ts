import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './schema/payment.schema';
import { BookModule } from '../book/book.module';
import { BooksSoldModule } from '../books_sold/books_sold.module';
import { BooksBoughtModule } from '../books_bought/books_bought.module';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    BookModule,
    BooksSoldModule,
    BooksBoughtModule,
  ],
})
export class PaymentsModule {}
