import { IsNotEmpty, IsString } from "class-validator";

export class UserSignUpDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    displayName: string;
}