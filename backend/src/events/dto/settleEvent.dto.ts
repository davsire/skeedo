import { IsDateString, IsNotEmpty } from 'class-validator';

export class SettleEventDto {
  @IsNotEmpty()
  @IsDateString()
  eventDate: Date;
}
