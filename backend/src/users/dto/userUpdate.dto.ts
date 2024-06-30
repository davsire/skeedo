import { IsString, IsOptional } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  displayName: string;
}
