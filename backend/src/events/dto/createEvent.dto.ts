import { IsDateString, IsNotEmpty, IsString } from "class-validator";

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
}
