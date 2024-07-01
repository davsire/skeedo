import { User } from './user.model';

export interface EventBestDates {
  maxCountBestDate: number;
  dates: BestDate[];
}

export interface BestDate {
  date: string;
  available: User[];
}
