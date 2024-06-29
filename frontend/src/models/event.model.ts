import { EventStatus } from 'src/shared/constants';
import { User } from './user.model';

export interface Event {
  _id: string;
  name: string;
  creator: User;
  beginDate: Date;
  endDate: Date;
  eventDate: Date;
  status: EventStatus;
  participants: User[];
}
