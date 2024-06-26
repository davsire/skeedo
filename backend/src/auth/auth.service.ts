import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'schemas/user.schema';
import { CreateUserDto } from 'src/domain/dto/createUserDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly model: Model<UserDocument>) {}
  login(username: string, password: string): string {  
    // this.model.find()
    return 'yo';
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // check if user already exists
    const exists = await this.model.find({ username: createUserDto.username }).exec();

    if (exists) {
      throw("Usuário com esse nome já existe")
    }

    // generate random salt
    const salt = 10;
    const hash = await bcrypt.hash(createUserDto.password, salt);

    // create new user
    return await new this.model({
      ...createUserDto,
      passwordHash: hash,
      salt: salt,
      createdAt: new Date(),
    }).save();
  }
}
