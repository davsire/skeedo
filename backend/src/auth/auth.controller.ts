import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignInDto } from 'src/domain/dto/userSignIn.dto';
import { UserSignUpDto } from 'src/domain/dto/userSignUp.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  async signIn(@Body() userSignInDto: UserSignInDto) {
    return this.authService.signIn(userSignInDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  signUp(@Body() userSignUpDto: UserSignUpDto) {
    return this.authService.signUp(userSignUpDto);
  }
}
