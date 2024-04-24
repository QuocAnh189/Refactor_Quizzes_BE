//mongoose
import { Schema, model } from 'mongoose';

//SCHEMA
import { SCHEMA } from '@/constants/schema';

//interface
import { ICategory } from '@/interfaces';

const categorySchema = new Schema<ICategory>(
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

export const Category = model<ICategory>(SCHEMA.CATEGORY, categorySchema);
