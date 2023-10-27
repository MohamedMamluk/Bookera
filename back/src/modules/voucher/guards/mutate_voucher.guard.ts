import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { VoucherService } from '../voucher.service';
import { Request } from 'express';
@Injectable()
export class CanMutate implements CanActivate {
  constructor(private voucherService: VoucherService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user as { userId: string };
    const voucher = await this.voucherService.findOne(request.params.id);

    if (!(user.userId === String(voucher.sellerId))) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
