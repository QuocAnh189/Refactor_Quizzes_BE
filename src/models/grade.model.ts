//mongoose
import { Schema, model } from 'mongoose';

//schema
import { SCHEMA } from '@/constants/schema';

//interface
import { IGrade } from '@/interfaces';

const gradeSchema = new Schema<IGrade>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Grade = model<IGrade>(SCHEMA.GRADE, gradeSchema);
