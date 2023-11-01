import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { BookModule } from './modules/book/book.module';
import { VoucherModule } from './modules/voucher/voucher.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { FileUploadModule } from './modules/file_upload/file_upload.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { BooksBoughtModule } from './modules/books_bought/books_bought.module';
import { BooksSoldModule } from './modules/books_sold/books_sold.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${process.cwd()}/src/environments/.env.development.local`],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        PORT: Joi.number().default(3000),
        MONGO_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        CLOUDINARY_CLOUD_NAME: Joi.string().required(),
        CLOUDINARY_API_KEY: Joi.string().required(),
        CLOUDINARY_API_SECRET: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get('MONGO_URI'),
        };
      },
      inject: [ConfigService],
    }),
    UserModule,

    AuthModule,
    BookModule,
    VoucherModule,
    DashboardModule,
    FileUploadModule,
    PaymentsModule,
    BooksBoughtModule,
    BooksSoldModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
