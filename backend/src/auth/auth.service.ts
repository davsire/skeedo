import { HttpException, Injectable, PayloadTooLargeException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'schemas/user.schema';
import { userSignInDto } from 'src/users/dto/userSignIn.dto';
import { UserSignUpDto } from 'src/users/dto/userSignUp.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService
  ) {}
  async signIn(userSignInDto: userSignInDto): Promise<{ access_token: string }> {
    // get user from db
    const users = await this.userModel.find({username: userSignInDto.username}).exec();
    const user = users[0];
    if (user === undefined) {
      throw new UnauthorizedException();
    }

    // authenticate
    const isMatch = await bcrypt.compare(userSignInDto.password, user.passwordHash)
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    // issue token
    const payload = { sub: user._id, username: user.username};
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async signUp(userSignUpDto: UserSignUpDto): Promise<{ access_token: string }> {
    // check if user already exists
    const exists = await this.userModel.find({ username: userSignUpDto.username }).exec();

    if (exists[0]) {
      throw new HttpException("User already exists", 400);
    }

    // hash password
    const passwordHash = await bcrypt.hash(userSignUpDto.password, 2);

    // create user in db
    const user = await new this.userModel({
      ...userSignUpDto,
      passwordHash,
      createdAt: new Date(),
    }).save();

    // issue token
    const payload = { sub: user._id, username: user.username};
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
