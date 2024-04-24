//mongoose
import { Schema, model } from 'mongoose';

//enum
import { UOptionQuestion, UPointType, UQuestionType } from '@/constants/enum';

//schema
import { SCHEMA } from '@/constants/schema';

//interface
import { IQuestion } from '@/interfaces';

const questionSchema = new Schema<IQuestion>(
  {
    content: {
      type: String,
    },

    tags: {
      type: [String],
    },

    creatorId: { type: Schema.Types.ObjectId, ref: 'User' },

    coverImage: {
      type: String,
    },

    questionIndex: { type: Number, required: true },

    questionType: {
      type: String,
      enum: UQuestionType,
      required: true,
    },

    optionQuestion: {
      type: String,
      required: true,
      enum: UOptionQuestion,
    },

    pointType: {
      type: String,
      enum: UPointType,
      required: true,
    },

    isPublic: { type: Boolean, required: true, default: true },

    answerTime: {
      type: Number,
      min: 5,
      max: 90,
    },

    maxCorrectAnswer: { type: Number, required: true },

    answerList: [
      {
        name: { type: String },
        body: { type: String },
        isCorrect: { type: Boolean },
      },
    ],

    correctAnswerCount: { type: Number, required: true },

    answerCorrect: { type: [String], required: true },
  },

  {
    timestamps: true,
  },
);

export const Question = model<IQuestion>(SCHEMA.QUESTION, questionSchema);
