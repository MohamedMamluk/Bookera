import { Injectable } from '@nestjs/common';
import { BooksSold } from './schema/books_sold.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BooksSoldService {
  constructor(
    @InjectModel(BooksSold.name) private BooksSoldRepo: Model<BooksSold>,
  ) {}

  async create(data: {
    sellerId: mongoose.Schema.Types.ObjectId;
    bookId: mongoose.Schema.Types.ObjectId;
  }) {
    return this.BooksSoldRepo.create(data);
  }

  async findBySellerIdAndPopulate(
    sellerId: string,
    query: Record<string, string>,
  ) {
    const books_Sold = await this.BooksSoldRepo.find({ sellerId })
      .populate('bookId')
      .limit(Number(query.limit) || 0)
      .sort({ createdAt: -1 });

    return books_Sold;
  }

  async sellingStatistics(sellerId: string) {
    const bookSalesStats = await this.BooksSoldRepo.aggregate([
      { $match: { sellerId: new mongoose.Types.ObjectId(sellerId) } },
      { $group: { _id: '$bookId', booksSold: { $sum: 1 } } },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'book',
        },
      },
      { $unwind: '$book' },
      {
        $project: {
          bookId: '$_id',
          booksSold: 1,
          totalPrice: { $multiply: ['$booksSold', '$book.price'] },
          book: 1,
          _id: 0,
        },
      },

      { $sort: { booksSold: -1 } },
    ]);
    return bookSalesStats;
  }
}
