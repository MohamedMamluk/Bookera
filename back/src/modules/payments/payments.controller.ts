import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { User } from 'src/common/decorators/user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CanMutate } from './guards/can_mutate.guard';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('payments')
@ApiTags('Payment')
@ApiBearerAuth('access_token')
@UseGuards(JwtGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-intent')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        bookId: {
          type: 'string',
        },
      },
    },
  })
  @ApiResponse({ status: HttpStatus.CREATED })
  async createPaymentIntent(
    @Body('bookId') bookId: string,
    @User() user: { userId: string },
  ) {
    const intent = await this.paymentsService.createIntent(bookId, user.userId);
    return intent;
  }

  @Patch(':id')
  @UseGuards(CanMutate)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          enum: ['COMPLETED', 'PENDING'],
        },
      },
    },
  })
  @ApiResponse({ status: HttpStatus.CREATED })
  async updatePayment(@Param('id') paymentId: string, @Body() updateBody: any) {
    return this.paymentsService.updatePayment(paymentId, updateBody);
  }
}
