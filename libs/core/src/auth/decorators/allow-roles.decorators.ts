import { CustomDecorator, SetMetadata } from '@nestjs/common'
import { UserRole } from '../models/oauth.payload'

export const AllowedRoles = (roles: Array<UserRole>): CustomDecorator<string> =>
  SetMetadata('allowed-roles', roles)
