//mongoose
import { Schema, model } from 'mongoose';

//schema
import { SCHEMA } from '@/constants/schema';

//interface
import { IGame } from '@/interfaces';

const gameSchema = new Schema<IGame>(
  {
    hostId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    quizId: {
      type: Schema.Types.ObjectId,
      ref: 'Quiz',
    },

    pin: {
      type: String,
    },

    isLive: {
      type: Boolean,
      default: false,
    },

    playerList: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    playerResultList: [
      {
        type: Schema.Types.ObjectId,
        ref: 'PlayerResult',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Game = model<IGame>(SCHEMA.GAME, gameSchema);
