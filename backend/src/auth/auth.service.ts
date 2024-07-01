import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'schemas/user.schema';
import { UserSignInDto } from 'src/users/dto/userSignIn.dto';
import { UserSignUpDto } from 'src/users/dto/userSignUp.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Password, PasswordDocument } from 'schemas/password.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Password.name) private readonly passwordModel: Model<PasswordDocument>,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}
  async signIn(
    userSignInDto: UserSignInDto,
  ): Promise<{ access_token: string; user_id: string }> {
    // get user from db
    const users = await this.userModel
      .find({ username: userSignInDto.username })
      .exec();
    const user = users[0];
    if (user === undefined) {
      throw new UnauthorizedException();
    }

    // authenticate
    const password = await this.passwordModel.findOne({user: user.id});

    const isMatch = await bcrypt.compare(
      userSignInDto.password,
      password.hash,
    );
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    // issue token
    const payload = { sub: user._id };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user_id: user._id.toString(),
    };
  }

  async signUp(
    userSignUpDto: UserSignUpDto,
  ): Promise<{ access_token: string; user_id: string }> {
    // check if user already exists
    await this.userService.checkUserExists(userSignUpDto.username);

    // hash password
    const hash = await bcrypt.hash(userSignUpDto.password, 2);

    // create user in db
    const user = await new this.userModel({
      ...userSignUpDto,
    }).save();

    await new this.passwordModel({
      user: user._id,
      hash
    }).save();

    // issue token
    const payload = { sub: user._id };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user_id: user._id.toString(),
    };
  }
}
