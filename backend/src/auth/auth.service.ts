import { HttpException, Injectable, PayloadTooLargeException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'schemas/user.schema';
import { userSignInDto } from 'src/domain/dto/userSignIn.dto';
import { UserSignUpDto } from 'src/domain/dto/userSignUp.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService
  ) {}
  async signIn(userLogInDto: userSignInDto): Promise<{ access_token: string }> {  
    const users = await this.userModel.find({username: userLogInDto.username}).exec();
    const user = users[0];
    const hash = await bcrypt.hash(user?.salt && '', userLogInDto.password);
    if (hash != user?.passwordHash) {
      throw new UnauthorizedException();
    }
    
    const payload = { sub: user._id, username: user.username};
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async signUp(createUserDto: UserSignUpDto): Promise<{ access_token: string }> {
    // check if user already exists
    const exists = await this.userModel.find({ username: createUserDto.username }).exec();

    if (exists[0]) {
      throw new HttpException("User already exists", 400);
    }

    // generate random salt
    const salt = crypto.randomBytes(32).toString('hex');
    const passwordHash = await bcrypt.hash(salt, createUserDto.password);

    // create new user
    const user = await new this.userModel({
      ...createUserDto,
      passwordHash,
      salt,
      createdAt: new Date(),
    }).save();

    const payload = { sub: user._id, username: user.username};
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
