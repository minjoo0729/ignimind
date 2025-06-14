import {
    Controller,
    Post,
    Get,
    Body,
    UseGuards,
    Request,
  } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
  
@Controller('quotes')
export class QuotesController {
constructor(private quotesService: QuotesService) {}

// 로그인된 사용자만 사용
@UseGuards(JwtAuthGuard)
@Post()
create(@Request() req, @Body() dto: CreateQuoteDto) {
    return this.quotesService.create(req.user.sub, dto);
}

@Get('random')
findRandom() {
    return this.quotesService.findRandom();
}
}
  