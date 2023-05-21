import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from './common/pipes/validation.pipe';
import * as admin from 'firebase-admin';
import { config } from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  const { firebase, storageBucket } = config();

  admin.initializeApp({
    credential: admin.credential.cert(firebase as admin.ServiceAccount),
    storageBucket: storageBucket,
  });

  await app.listen(process.env.PORT || 5000, async () => {
    console.log('listening on port ' + (await app.getUrl()));
  });
}
bootstrap();
