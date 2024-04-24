//mongoose
import { Schema, model } from 'mongoose';

//schema
import { SCHEMA } from '@/constants/schema';

//interface
import { ILeaderboard } from '@/interfaces';

const leaderBoardSchema = new Schema<ILeaderboard>(
  {
    gameId: {
      type: Schema.Types.ObjectId,
      ref: 'Game',
    },

    quizId: {
      type: Schema.Types.ObjectId,
      ref: 'Quiz',
    },

    pin: {
      type: String,
    },

    playerResultList: [
      {
        type: Schema.Types.ObjectId,
        ref: 'PlayerResult',
      },
    ],

    currentLeaderBoard: [
      {
        questionIndex: { type: Number },
        leaderBoardList: [
          {
            player: {
              type: Schema.Types.ObjectId,
              ref: 'User',
            },
            pointAnswerQuestion: { type: Number },
            playerCurrentScore: { type: Number },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const LeaderBoard = model(SCHEMA.LEADERBOARD, leaderBoardSchema);
