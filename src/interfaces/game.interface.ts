import { ObjectId } from 'mongodb';

export interface IGame {
  _id: ObjectId;
  hostId: ObjectId;
  quizId: ObjectId;
  pin: string;
  isLive: boolean;
  playerList: ObjectId[];
  playerResultList: ObjectId[];
  createAt?: string;
  updatedAt?: string;
}
