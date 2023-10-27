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
    const filters: Record<string, any> = {};

    if (query.title) {
      filters.title = { $regex: new RegExp(query.title, 'i') };
    }

    return this.bookRepo.find(filters);
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
}
