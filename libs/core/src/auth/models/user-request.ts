import { Request } from 'express';
import { User } from './user.jwt';

export interface UserRequest extends Request {
  user: User;
}