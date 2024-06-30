import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './createEvent.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @IsNotEmpty()
  @IsString()
  name: string;
}
