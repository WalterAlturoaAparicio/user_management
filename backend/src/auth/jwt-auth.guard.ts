// jwt-auth.guard.ts
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, _info: any, _context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException('Authentication failed')
    }
    return user
  }
}
