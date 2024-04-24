import { ObjectId } from 'mongodb';

export type AnswerLeaderBoardResultType = {
  _id?: ObjectId;
  playerId: ObjectId;
  pointAnswerQuestion: number;
  playerCurrentScore: number;
};

export type CurrentLeaderBoardType = {
  _id?: ObjectId;
  questionIndex: number;
  leaderBoardList: AnswerLeaderBoardResultType[];
};

export interface ILeaderboard {
  _id?: ObjectId;
  gameId: ObjectId;
  quizId: ObjectId;
  pin: string;
  playerResultList: ObjectId[];
  currentLeaderBoard: CurrentLeaderBoardType[];
}
