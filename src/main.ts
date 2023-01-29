import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // const whitelist = ['http://localhost:3000', 'https://mobile-sell.vercel.app'];
  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header(
  //     'Access-Control-Allow-Methods',
  //     'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  //   );
  //   res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  //   next();
  // });

  // app.enableCors({
  //   allowedHeaders: '*',
  //   origin: '*',
  // });
  app.enableCors();
  // app.enableCors({
  //   credentials: true,
  //   origin: ['http://localhost:3000', 'https://mobile-sell.vercel.app'],
  //   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  // });
  // app.enableCors({
  //   origin: '*',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  // });
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
