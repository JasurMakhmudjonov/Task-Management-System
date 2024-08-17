import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return false;

    try {
      const verify = await this.jwt.verifyAsync(token, {
        secret: this.config.get('JWT_SECRET_KEY'),
      });

      if (!verify) return false;

      req.user = verify;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
