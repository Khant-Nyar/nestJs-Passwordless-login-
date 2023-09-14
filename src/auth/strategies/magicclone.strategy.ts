import { AuthService } from './../auth.service';
import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-magic-login'; // import MagicLoginStrategy from "passport-magic-login";
import { PasswordLessLoginDto } from '../dto/passless-login.dto';

@Injectable()
export class MagicLoginStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(MagicLoginStrategy.name);

  constructor(private authService: AuthService) {
    super({
      secret: 'your-secret', // Get this from env variable
      jwtOptions: {
        expiresIn: '5m',
      },
      callbackUrl: 'http://localhost:3000/auth/login/callback', // Get this from env variable
      sendMagicLink: async (destination: string, href: string) => {
        // send email
        this.logger.debug(`sending email to ${destination} with link ${href}`);
      },
      verify: async (
        payload: any,
        callback: (arg0: null, arg1: any) => void,
      ) => {
        callback(null, this.validate(payload));
      },
    });
  }
  validate(payload: PasswordLessLoginDto) {
    // validate email,user of application
    const user = this.authService.validateUser(payload.destination);
    return user;
  }
}
