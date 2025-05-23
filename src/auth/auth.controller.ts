import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signIn(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }

  @Post()
  signUp(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }
}
