import { IsArray, IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'schemas/user.schema';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  beginDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;

  @IsNotEmpty()
  @IsArray()
  participants: User[];
}
