import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateUserException extends HttpException {
  constructor(email: string) {
    super(`User with the email ${email} already exists.`, HttpStatus.CONFLICT);
  }
}
