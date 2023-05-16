import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from './users.module';
import { AuthService } from '../providers/auth.service';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { LocalStrategy } from '../strategy/local.strategy';
@Module({
  imports: [
    PassportModule,
    forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRETE,
        signOptions: { expiresIn: '10h' },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
