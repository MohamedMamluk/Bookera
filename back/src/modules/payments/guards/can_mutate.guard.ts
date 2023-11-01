import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PaymentsService } from '../payments.service';
import { Request } from 'express';
@Injectable()
export class CanMutate implements CanActivate {
  constructor(private paymentService: PaymentsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user as { userId: string };
    const payment = await this.paymentService.findByPaymentId(
      request.params.id,
    );

    if (!(user.userId === String(payment.buyer))) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
