import { BadRequestException, Injectable } from '@nestjs/common';
import { BooksBought } from './schema/books_bought';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BooksBoughtService {
  constructor(
    @InjectModel(BooksBought.name) private BooksBoughtRepo: Model<BooksBought>,
  ) {}

  async create(data: {
    buyerId: mongoose.Schema.Types.ObjectId;
    book: mongoose.Schema.Types.ObjectId;
  }) {
    const alreadyBought = await this.findByBuyerIdAndBookId(data);
    if (alreadyBought) {
      throw new BadRequestException('User already bought this book');
    }
    return this.BooksBoughtRepo.create(data);
  }

  async findByBuyerIdAndBookId(data: {
    buyerId: mongoose.Schema.Types.ObjectId;
    book: mongoose.Schema.Types.ObjectId;
  }) {
    const books_bought = await this.BooksBoughtRepo.findOne(data);

    return books_bought;
  }

  async findByBuyerIdAndPopulate(buyerId: string) {
    const books_bought = await this.BooksBoughtRepo.find({ buyerId }).populate(
      'book',
    );

    return books_bought;
  }
}
