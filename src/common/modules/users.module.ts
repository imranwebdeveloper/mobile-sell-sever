import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from '../providers/users.service';
import { UsersController } from '../controllers/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schema/user';
import { AuthModule } from './auth.module';
import { AuthService } from '../providers/auth.service';
import { JwtStrategy } from '../strategy/jwt.strategy';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
