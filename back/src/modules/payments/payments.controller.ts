import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { User } from 'src/common/decorators/user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CanMutate } from './guards/can_mutate.guard';

@Controller('payments')
@UseGuards(JwtGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-intent')
  async createPaymentIntent(
    @Body('bookId') bookId: string,
    @User() user: { userId: string },
  ) {
    const intent = await this.paymentsService.createIntent(bookId, user.userId);
    return intent;
  }

  @Patch(':id')
  @UseGuards(CanMutate)
  async updatePayment(@Param('id') paymentId: string, @Body() updateBody: any) {
    return this.paymentsService.updatePayment(paymentId, updateBody);
  }
}
