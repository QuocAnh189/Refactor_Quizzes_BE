//mongoose
import { Schema, model } from 'mongoose';

//schema
import { SCHEMA } from '@/constants/schema';

import { IPlayerResult } from '@/interfaces';

const playerResultSchema = new Schema<IPlayerResult>(
  {
    playerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    gameId: {
      type: Schema.Types.ObjectId,
      ref: 'Game',
    },

    score: {
      type: Number,
      default: 0,
    },

    answers: [
      {
        questionIndex: { type: Number },
        answered: {
          type: Boolean,
          default: false,
        },
        answers: [String],
        time: { type: Number },
        point: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const PlayerResult = model<IPlayerResult>(SCHEMA.PLAYERRESULT, playerResultSchema);
