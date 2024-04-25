import { ObjectId } from 'mongodb';

export interface IQuiz {
  _id: ObjectId;
  name: string;
  creatorId: ObjectId;
  description: string;
  coverImage: string;
  isDraft: boolean;
  isPublic: boolean;
  category: ObjectId;
  grade: ObjectId;
  tags: string[];
  numberOfQuestions: number;
  pointsPerQuestion: number;
  ressourceId?: ObjectId;
  likes: ObjectId[];
  comments: ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
