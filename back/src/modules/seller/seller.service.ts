import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Seller } from './schema/seller.schema';
import { CreateSellerDto } from './Dtos/create_seller.dto';

@Injectable()
export class SellerService {
  constructor(@InjectModel(Seller.name) private sellerRepo: Model<Seller>) {}

  async createSeller(SellerData: CreateSellerDto) {
    const createdSeller = this.sellerRepo.create(SellerData);
    if (!createdSeller) {
      throw new Error('Something went wrong');
    }
    return {
      data: 'Seller Created',
    };
  }

  async findByEmail(email: string) {
    const Seller = await this.sellerRepo.findOne({ email });

    return Seller;
  }
  async findById(id: string) {
    const Seller = await this.sellerRepo.findById(id);
    if (!Seller) {
      throw new BadRequestException();
    }

    return Seller;
  }
}
