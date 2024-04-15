import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserRequest } from '../models/user-request'
import { User } from '../models/user.jwt'

export const CurrentUser = createParamDecorator(
  async (data: unknown, context: ExecutionContext): Promise<UserRequest> => {
    const request = context.switchToHttp().getRequest<UserRequest>()
    if (!request.user && request.user['user']) {
      throw new Error('user not found')
    }

    const jwt = {
      user: {
        id: request.user['user'].id,
        name: request.user['user'].name,
        email: request.user['user']['email']
      } as User
    } as UserRequest

    return jwt
  }
)
