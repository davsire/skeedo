import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'schemas/user.schema';
import { UserSignUpDto } from 'src/users/dto/userSignUp.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: UserSignUpDto) {
    // user creation is handled by auth module
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(id) {
    try {
      const user = await this.userModel.findById(id);
      return user;
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id, updateUserDto, token) {
    try {
      if (id !== token.sub) {
        throw new UnauthorizedException();
      }

      return await this.userModel.findByIdAndUpdate(
        id,
        { displayName: updateUserDto.displayName },
        { returnDocument: 'after' },
      );
    } catch {
      throw new NotFoundException();
    }
  }

  async remove(id, token) {
    try {
      if (id !== token.sub) {
        throw new UnauthorizedException();
      }

      return await this.userModel.findByIdAndDelete(id);
    } catch {
      throw new NotFoundException();
    }
  }
}
