import { Injectable } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Voucher } from './schema/voucher.schema';
import { Model } from 'mongoose';
import { DuplicateUserException } from 'src/exxceptions/duplicated.exception';

@Injectable()
export class VoucherService {
  constructor(
    @InjectModel(Voucher.name) private readonly voucherRepo: Model<Voucher>,
  ) {}
  async create(createVoucherDto: CreateVoucherDto) {
    try {
      const voucher = await this.voucherRepo.create(createVoucherDto);
      return voucher;
    } catch (error) {
      if (error.code === 11000) {
        throw new DuplicateUserException(
          `Voucher with the code "${createVoucherDto.code}" already exists.`,
        );
      }
      throw new Error(error);
    }
  }

  findAll(user: { userId: string }) {
    const { userId } = user;
    return this.voucherRepo.find({ sellerId: userId });
  }

  findOne(id: string) {
    return this.voucherRepo.findById(id);
  }

  update(id: string, updateVoucherDto: UpdateVoucherDto) {
    return this.voucherRepo.findByIdAndUpdate(id, updateVoucherDto, {
      new: true,
      lean: true,
    });
  }

  remove(id: string) {
    return this.voucherRepo.findByIdAndRemove(id);
  }
}
