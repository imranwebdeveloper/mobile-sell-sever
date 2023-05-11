import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { MobileModule } from './common/modules/mobile.module';
import { UsersModule } from './common/modules/users.module';
import { AuthModule } from './common/modules/auth.module';
import { CommentModule } from './common/modules/comment.module';
import { RolesGuard } from './common/guards/role.guard';
import { UtilsModule } from './common/modules/utils.module';
import { UploadModule } from './common/modules/upload.module';

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
    UtilsModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
