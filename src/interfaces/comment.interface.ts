import { ObjectId } from 'mongodb';

export interface IComment {
  _id?: ObjectId;
  userId: ObjectId;
  quizId: ObjectId;
  createdAt?: Date;
  updateAt?: Date;
}
