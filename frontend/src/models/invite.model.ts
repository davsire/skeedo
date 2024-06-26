import { Event } from './event.model';
import { User } from './user.model';

export class Invite {
  _id: string;
  event: Event;
  user: User;
  availableDays: Date[];
  responded: boolean;
}
