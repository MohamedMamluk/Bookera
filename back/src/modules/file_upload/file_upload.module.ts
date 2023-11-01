import { Module } from '@nestjs/common';
import { FileUploadService } from './file_upload.service';
import { FileUploadController } from './file_upload.controller';
import { HttpModule } from '@nestjs/axios';
import { CloudinaryProvider } from './cloudinary/cloudinary.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from './schema/file.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [FileUploadController],
  providers: [FileUploadService, CloudinaryProvider],
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
    AuthModule,
  ],
})
export class FileUploadModule {}
