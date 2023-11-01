import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { BookModule } from '../book/book.module';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
  imports: [BookModule],
})
export class DashboardModule {}
