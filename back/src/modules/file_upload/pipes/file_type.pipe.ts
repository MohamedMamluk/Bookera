import { Injectable, FileValidator, BadRequestException } from '@nestjs/common';
@Injectable()
export class FileTypeValidator extends FileValidator {
  constructor(private fileType: string) {
    super({ FileTypeValidator: fileType });
  }
  isValid(file?: any): boolean | Promise<boolean> {
    return file.mimetype.includes(this.fileType);
  }
  buildErrorMessage(): string {
    throw new BadRequestException(
      'The file provided is not of type ' + this.fileType,
    );
  }
}
