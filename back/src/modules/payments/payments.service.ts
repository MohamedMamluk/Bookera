import { BadRequestException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Payment, PaymentStatus } from './schema/payment.schema';
import { Model } from 'mongoose';
import { BookService } from '../book/book.service';
import { BooksSoldService } from '../books_sold/books_sold.service';
import { BooksBoughtService } from '../books_bought/books_bought.service';

@Injectable()
export class PaymentsService {
  private stripe;

  constructor(
    private bookService: BookService,
    private booksSoldService: BooksSoldService,
    private booksBoughtService: BooksBoughtService,

    private configService: ConfigService,
    @InjectModel(Payment.name) private readonly paymentsRepo: Model<Payment>,
  ) {
    this.stripe = new Stripe(configService.get('STRIPE_API_SECRET'));
  }

  createIntent = async (bookId: string, buyerId: string) => {
    const book = await this.bookService.findOne(bookId);
    if (String(book.sellerId) === buyerId) {
      throw new BadRequestException('You can not buy your own book 🤦‍♀️');
    }
    const intent = await this.stripe.paymentIntents.create({
      currency: 'USD',
      amount: book.price * 100,
      automatic_payment_methods: { enabled: true },
    });
    const paymentDetails = await this.paymentsRepo.create({
      paymentId: intent.id,
      book: book._id,
      buyer: buyerId,
      seller: book.sellerId,
      client_secret: intent.client_secret,
      status: PaymentStatus.PENDING,
    });
    return paymentDetails;
  };

  async findByPaymentId(paymentId: string) {
    return this.paymentsRepo.findOne({ paymentId });
  }

  updatePayment = async (paymentId: string, updatedData: any) => {
    const payment = await this.paymentsRepo.findOne({ paymentId });

    if (payment.status == PaymentStatus.COMPLETED) {
      return payment;
    }
    if (
      payment.status == PaymentStatus.PENDING &&
      updatedData.status == PaymentStatus.COMPLETED
    ) {
      await this.booksSoldService.create({
        sellerId: payment.seller,
        bookId: payment.book,
      });
      await this.booksBoughtService.create({
        buyerId: payment.buyer,
        book: payment.book,
      });
    }
    payment.status = updatedData.status;
    payment.save();
    return payment;
  };
}
