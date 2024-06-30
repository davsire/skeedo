import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'schemas/user.schema';
import { UserSignUpDto } from 'src/users/dto/userSignUp.dto';
import { UserUpdateDto } from './dto/userUpdate.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: UserSignUpDto) {
    // user creation is handled by auth module
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel.findById(id);
      return user;
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, updateUserDto: UserUpdateDto, token: any) {
    if (id !== token.sub) {
      throw new UnauthorizedException();
    }

    await this.checkUserExists(updateUserDto.username, id);

    const userUpdate = {};

    for (const key in updateUserDto) {
      if (updateUserDto[key] && key !== 'password') {
        userUpdate[key] = updateUserDto[key];
      }
    }

    if (updateUserDto.password) {
      userUpdate['passwordHash'] = await bcrypt.hash(updateUserDto.password, 2);
    }

    try {
      return await this.userModel.findByIdAndUpdate(id, userUpdate, {
        returnDocument: 'after',
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async remove(id: string, token: any) {
    try {
      if (id !== token.sub) {
        throw new UnauthorizedException();
      }

      return await this.userModel.findByIdAndDelete(id);
    } catch {
      throw new NotFoundException();
    }
  }

  async checkUserExists(username: string, userId?: string): Promise<void> {
    const [existentUser] = await this.userModel.find({ username }).exec();

    if (existentUser && existentUser._id.toString() !== userId) {
      throw new HttpException('User already exists', 400);
    }
  }
}
