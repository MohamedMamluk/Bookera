import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { BookModule } from '../book/book.module';

@Module({
  controllers: [DashboardController],
  imports: [BookModule],
})
export class DashboardModule {}
