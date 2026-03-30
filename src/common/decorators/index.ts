import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';

export interface JwtPayload {
  sub: string; // user ID
  email: string;
  role: 'ADMIN' | 'EDITOR';
  iat?: number;
  exp?: number;
}

/** Injects the authenticated user from request into the controller parameter. */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as JwtPayload;
  },
);

export const ROLES_KEY = 'roles';

/** Restricts a route to users with the specified roles. */
export const Roles = (...roles: Array<'ADMIN' | 'EDITOR'>) =>
  SetMetadata(ROLES_KEY, roles);
