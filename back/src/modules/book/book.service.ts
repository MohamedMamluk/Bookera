import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schema/book.schema';
import { Model } from 'mongoose';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private readonly bookRepo: Model<Book>) {}
  create(createBookDto: CreateBookDto & { sellerId: any }) {
    return this.bookRepo.create(createBookDto);
  }

  findAll(query: Record<string, string>) {
    console.log(query);
    const filters: Record<string, any> = this.applyFilters(query);
    console.log(filters);
    const sortBy = this.sortByFilters(query.sortBy);
    return this.bookRepo.find(filters).sort(sortBy);
  }

  async findAllBySellerId(sellerId: string) {
    console.log(sellerId);
    return this.bookRepo.find({ sellerId });
  }

  findOne(id: string) {
    return this.bookRepo.findById(id);
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return this.bookRepo.findByIdAndUpdate(id, updateBookDto, {
      new: true,
      lean: true,
    });
  }

  remove(id: string) {
    return this.bookRepo.findByIdAndRemove(id);
  }
  private applyFilters = (query: Record<string, string>) => {
    const filters: Record<string, any> = {};
    if (query.title) {
      filters.title = { $regex: new RegExp(query.title, 'i') };
    }
    if (query.min) {
      filters.price = { ...filters.price, $gte: Number(query.min) };
    }

    if (query.max) {
      filters.price = { ...filters.price, $lte: Number(query.max) };
    }

    if (query.category) {
      filters.category = { $eq: query.category };
    }
    return filters;
  };

  private sortByFilters(sortBy: string) {
    const sortByFilter: any = { price: false };
    if (sortBy == 'price-asc') {
      sortByFilter.price = 1;
    } else if ((sortBy = 'price-desc')) {
      sortByFilter.price = -1;
    } else {
      sortByFilter.createdAt = -1;
    }
    return sortByFilter;
  }
}
