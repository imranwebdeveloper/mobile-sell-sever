import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
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

      const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (!requiredRoles) return true;

      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        const user = await this.authService.validateToken(token);
        req.user = user;
        return requiredRoles.some((role) => user.roles?.includes(role));
      }
      return false;
    } catch (error) {
      if (error.message === 'invalid token') {
        return false;
      }
    }
  }
}
