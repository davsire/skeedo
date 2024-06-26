import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLogInDto } from 'src/domain/dto/userLogInDto';
import { CreateUserDto } from 'src/domain/dto/createUserDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/login')
  login(userLogInDto: UserLogInDto): string {
    const username = userLogInDto.username;
    const password = userLogInDto.password;
    return this.authService.login(username, password);
  }

  @Get('/register')
  create(createUserDto: CreateUserDto): string {
    const username = createUserDto.username;
    const password = createUserDto.password;
    const displayName = createUserDto.displayName
    return this.authService.create(username, password, displayName);
  }

}
