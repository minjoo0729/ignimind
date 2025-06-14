import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Quote } from './quote.entity';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quote]),
    UsersModule,  // user lookup 위해
  ],
  providers: [QuotesService],
  controllers: [QuotesController],
})
export class QuotesModule {}
