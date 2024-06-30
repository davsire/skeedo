import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
