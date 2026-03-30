import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';

export interface JwtPayload {
  sub: string;
  email: string;
  role: 'ADMIN' | 'EDITOR';
  iat?: number;
  exp?: number;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as JwtPayload;
  },
);

export const ROLES_KEY = 'roles';

export const Roles = (...roles: Array<'ADMIN' | 'EDITOR'>) =>
  SetMetadata(ROLES_KEY, roles);
