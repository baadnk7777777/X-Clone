import { Timestamp } from 'firebase/firestore';

export interface Content {
  userId: number;
  liked: boolean;
  content: string;
  date: Timestamp;
}
