import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserUpdateDto } from './dto/userUpdate.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  modify(
    @Param('id') id: string,
    @Body() updateUserDto: UserUpdateDto,
    @Request() req,
  ) {
    return this.userService.update(id, updateUserDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.userService.remove(id, req.user);
  }
}
