import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Quote } from './quote.entity';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote) private quotesRepo: Repository<Quote>,
    private usersService: UsersService,
    private dataSource: DataSource,
  ) {}

  async create(userId: number, dto: CreateQuoteDto) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const quote = this.quotesRepo.create({ ...dto, user });
    await this.quotesRepo.save(quote);
    return quote;
  }

  async findRandom() {
    // MySQL 의 RAND() 사용
    const raw = await this.dataSource.query(
      `SELECT * FROM quotes ORDER BY RAND() LIMIT 1;`,
    );
    if (raw.length === 0) throw new NotFoundException('No quotes found');
    return raw[0];
  }
}
