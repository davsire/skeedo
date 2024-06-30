import { IsNotEmpty } from 'class-validator';
import { Event } from 'schemas/event.schema';
import { User } from 'schemas/user.schema';

export class CreateInviteDto {
  @IsNotEmpty()
  event: Event;

  @IsNotEmpty()
  user: User;
}
