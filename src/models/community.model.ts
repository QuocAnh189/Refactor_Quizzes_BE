//mongoose
import { Schema, model } from 'mongoose';

//schema
import { SCHEMA } from '@/constants/schema';

const communitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    backgroundImage: {
      type: String,
    },

    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    quizzes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Quiz',
      },
    ],

    field: {
      type: String,
    },

    chatBox: [
      {
        type: [Schema.Types.ObjectId],
        ref: 'Message',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Community = model(SCHEMA.COMMUNITY, communitySchema);
