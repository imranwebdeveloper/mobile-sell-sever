import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { MobileModule } from './mobile/mobile.module';
import { Mobile, MobileSchema } from './schema/mobile';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { CommentModule } from './comment/comment.module';
import configuration from './store/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      // load: [configuration],
      // isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB),
    MobileModule,
    UsersModule,
    AuthModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
