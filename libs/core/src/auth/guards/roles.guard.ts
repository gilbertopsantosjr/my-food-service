import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserPayload, UserRole } from '../models/oauth.payload'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(
      'allowed-roles',
      context.getHandler()
    )
    if (!roles || roles.length === 0) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    if (request.isAuthenticated() === false) {
      return false
    }
    const payload = request.user as UserPayload
    return this.isAllowed(
      roles,
      payload.roles.map((role: UserRole) => role.roleName)
    )
  }

  private isAllowed(allowedRoles: string[], userRoles: string[]): boolean {
    return !!allowedRoles.find((value: string) => userRoles.includes(value))
  }
}
