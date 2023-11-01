import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateUserException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT);
  }
}
