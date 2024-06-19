import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLogInDto } from 'src/domain/dto/userLogInDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/login')
  login(userLogInDto: UserLogInDto): string {
    const username = userLogInDto.username;
    const password = userLogInDto.password;
    return this.authService.login(username, password);
  }

}
