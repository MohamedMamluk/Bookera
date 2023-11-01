import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v2 } from 'cloudinary';
import { Readable } from 'stream';
import { File } from './schema/file.schema';
import { Model } from 'mongoose';
@Injectable()
export class FileUploadService {
  constructor(
    @InjectModel(File.name) private readonly fileService: Model<File>,
  ) {}
  async uploadFile(file: Express.Multer.File) {
    // const fileExists = await this.fileService.findOne({
    //   name: file.originalname,
    // });
    // if (fileExists) {
    //   return fileExists;
    // }
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        {
          resource_type: 'auto',
          use_filename: true,
          upload_preset: 'pbplxxts',
        },
        async (error, result) => {
          if (error) return reject(error);
          const uploadedFile = await this.fileService.create({
            name: file.originalname,
            link: result.secure_url,
          });
          resolve(uploadedFile);
        },
      );
      const readable = new Readable();
      readable.push(file.buffer, 'base64');
      readable.push(null);
      readable.pipe(upload);
    });
  }
  async getBook() {
    const file = await v2.api.resources_by_asset_ids(
      '7beb2fa8a073575aeace318a3c79c4bc',
    );
    return file;
  }
  async uploadImage(file: Express.Multer.File) {
    const fileExists = await this.fileService.findOne({
      name: file.originalname,
    });
    if (fileExists) {
      return fileExists;
    }
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(async (error, result) => {
        if (error) return reject(error);
        const uploadedFile = await this.fileService.create({
          name: file.originalname,
          link: result.secure_url,
        });
        resolve(uploadedFile);
      });
      const readable = new Readable();
      readable.push(file.buffer, 'base64');
      readable.push(null);
      readable.pipe(upload);
    });
  }
}
