import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { User } from "schemas/user.schema";

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  creator: User;

  @IsNotEmpty()
  @IsDate()
  beginDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;  
}
