import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MobileModule } from './mobile/mobile.module';

@Module({
  imports: [
    MobileModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
