import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
// import { PasswordLessLoginDto } from '../dto/passless-login.dto';
import { Logger } from '@nestjs/common';

export class JwtLoginStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtLoginStrategy.name);

  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your-secret',
    });
  }
  async validate(payload: any) {
    this.logger.debug(`Protected Route can accepts with ${payload.email}`);
    return this.authService.validateUser(payload.email);
    const user = this.authService.validateUser(payload.email);
    return user;
  }
}
