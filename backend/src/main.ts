import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 아래 설정을 추가하세요.
  app.enableCors({
    origin: 'http://localhost:3000',  // 허용할 프론트엔드 주소
    credentials: true,               // 쿠키나 인증 헤더 허용
  });

  await app.listen(5000);
  console.log('✅ Backend running on http://localhost:5000');
}
bootstrap();
