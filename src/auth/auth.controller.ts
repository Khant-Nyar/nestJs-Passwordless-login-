import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { MagicLoginStrategy } from './strategies/magicclone.strategy';
import { PasswordLessLoginDto } from './dto/passless-login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private strategy: MagicLoginStrategy,
  ) {}

  //POST /auth/login { email } --> send magic link
  @Post('login')
  login(
    @Req() req: Request,
    @Res() res: Response,
    @Body(new ValidationPipe()) body: PasswordLessLoginDto,
  ) {
    this.authService.validateUser(body.destination);
    return this.strategy.send(req, res);
    //send magic link
  }

  //GET /auth/login/callback?token="$sd$asd.." --> JWT access toekn
  @UseGuards(AuthGuard('magiclogin'))
  @Get('login/callback')
  callback(@Req() req: any) {
    //generate JST access toekn
    // return req.user;
    return this.authService.generateToken(req.user);
  }
}
