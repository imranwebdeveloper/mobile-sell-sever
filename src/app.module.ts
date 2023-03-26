import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { MobileModule } from './common/modules/mobile.module';
import { Mobile, MobileSchema } from './common/schema/mobile';
import { UsersModule } from './common/modules/users.module';
import { AuthModule } from './common/modules/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { CommentModule } from './common/modules/comment.module';
import configuration from './config/configuration';
import { RolesGuard } from './common/guards/role.guard';
import { JwtStrategy } from './common/strategy/jwt.strategy';
import { UtilsModule } from './common/modules/utils.module';

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
