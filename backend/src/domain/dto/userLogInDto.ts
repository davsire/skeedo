import { IsNotEmpty, IsString } from "class-validator";

export class UserLogInDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}