import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../constants/user-role.enum';
import { AuthService } from '../providers/auth.service';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ApiKeyAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
    private jwt: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest() as Request;
      const clientKey = request.headers['x-api-key'] as string;
      if (!clientKey) return false;
      const valid = await this.jwt.verifyAsync(clientKey);
      if (!valid) return false;
      return false;
    } catch (error) {
      if (error.message === 'invalid token') {
        return false;
      }
    }
  }
}
