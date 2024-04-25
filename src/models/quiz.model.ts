//mongoose
import { Schema, model } from 'mongoose';

//schema
import { SCHEMA } from '@/constants/schema';

//interface
import { IQuiz } from '@/interfaces';

const quizSchema = new Schema<IQuiz>(
  {
    name: { type: String, required: true },

    creatorId: { type: Schema.Types.ObjectId, ref: 'User' },

    description: { type: String, default: '' },

    coverImage: {
      type: String,
      default:
        'https://res.cloudinary.com/dfoiuc0jw/image/upload/v1702735161/quiz-app/background/DefaultQuizBackgrounDark_xgrfvk.webp',
    },
    isDraft: { type: Boolean, required: true, default: true },

    isPublic: { type: Boolean, required: true, default: true },

    category: { type: Schema.Types.ObjectId, ref: 'Category' },

    grade: { type: Schema.Types.ObjectId, ref: 'Grade' },

    tags: [String],

    numberOfQuestions: {
      type: Number,
      default: 0,
    },

    pointsPerQuestion: {
      type: Number,
      min: 0,
      default: 0,
    },

    ressourceId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],

    comments: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },

  {
    timestamps: true,
  },
);

// quizSchema.pre('save', function (next) {
//   this.importFrom = this.importFrom ? this.importFrom : null;
//   this.category = this.category ? this.category : null;
//   this.grade = this.grade ? this.grade : null;
//   this.numberOfQuestions = this.questionList.length;

//   next();
// });

export const Quiz = model<IQuiz>(SCHEMA.QUIZ, quizSchema);
