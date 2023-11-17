import { Timestamp } from 'firebase/firestore';

export interface Content {
  documentId: string;
  userId: number;
  liked: boolean;
  content: string;
  date: Timestamp;
}
