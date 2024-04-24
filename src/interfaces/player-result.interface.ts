import { ObjectId } from 'mongodb';

export interface IPlayerAnswer {
  _id?: string;
  questionIndex?: number;
  answered: boolean;
  answers: string[];
  time: number;
  point: number;
}

export interface IPlayerResult {
  _id?: string;
  playerId: ObjectId;
  gameId: ObjectId;
  score: number;
  answers: any[];
}
