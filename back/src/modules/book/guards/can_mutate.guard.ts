import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { BookService } from '../book.service';
import { Request } from 'express';
@Injectable()
export class CanMutate implements CanActivate {
  constructor(private bookService: BookService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user as { userId: string };
    const book = await this.bookService.findOne(request.params.id);

    if (!(user.userId === String(book.sellerId))) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
