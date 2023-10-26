import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Buyer } from './schema/buyer.schema';
import { CreateBuyerDto } from './Dtos/create_buyer.dto';

@Injectable()
export class BuyerService {
  constructor(@InjectModel(Buyer.name) private buyerRepo: Model<Buyer>) {}

  async createBuyer(buyerData: CreateBuyerDto) {
    const createBuyer = this.buyerRepo.create(buyerData);
    if (!createBuyer) {
      throw new Error('Something went wrong');
    }
    return {
      data: 'buyer Created',
    };
  }

  async findByName(name: string) {
    const buyer = await this.buyerRepo.findOne({ name });
    if (!buyer) {
      throw new BadRequestException();
    }

    return buyer;
  }
  async findById(id: string) {
    const buyer = await this.buyerRepo.findById(id);
    if (!buyer) {
      throw new BadRequestException();
    }

    return buyer;
  }
}
