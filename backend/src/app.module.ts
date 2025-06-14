import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './users/user.entity';
import { Quote } from './quotes/quote.entity';
import { UsersModule } from './users/users.module';
import { QuotesModule } from './quotes/quotes.module';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cfg: ConfigService) => ({
        type: 'mysql',
        host: cfg.get<string>('DB_HOST'),
        port: cfg.get<number>('DB_PORT'),
        username: cfg.get<string>('DB_USER'),
        password: cfg.get<string>('DB_PASSWORD'),
        database: cfg.get<string>('DB_NAME'),
        entities: [User, Quote],
        synchronize: true,  // 개발 중에만 true
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Quote]),
    UsersModule,
    QuotesModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
