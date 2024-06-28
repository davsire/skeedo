import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'schemas/user.schema';
import { userSignInDto } from 'src/domain/dto/userSignIn.dto';
import { UserSignUpDto } from 'src/domain/dto/userSignUp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  async signIn(@Body() userSignInDto: userSignInDto) {
    return this.authService.signIn(userSignInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  signUp(@Body() userSignUpDto: UserSignUpDto) {
    return this.authService.signUp(userSignUpDto);
  }

}
