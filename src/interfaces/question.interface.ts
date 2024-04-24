import { ObjectId } from 'mongodb';

export interface answerType {
  name: string;
  body: string;
  isCorrect: boolean;
}

export interface IQuestion {
  _id?: string;
  content: string;
  creatorId: ObjectId;
  coverImage: string;
  questionIndex: number;
  questionType: string;
  tags: string[];
  optionQuestion: string;
  pointType: string;
  isPublic: boolean;
  answerTime: number;
  maxCorrectAnswer: number;
  answerList: answerType[];
  correctAnswerCount: number;
  answerCorrect: string[];
  createdAt?: string;
  updatedAt?: string;
}
