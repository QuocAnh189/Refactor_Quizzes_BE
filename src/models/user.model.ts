import { Schema, model } from 'mongoose';

import { SCHEMA } from '@/constants/schema';

//interface
import { IUser } from '@/interfaces';
import { EUserType } from '@/constants/enum';

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
    },

    userName: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 30,
    },

    firstName: {
      minlength: 2,
      maxlength: 7,
      type: String,
    },

    lastName: {
      minlength: 2,
      maxlength: 7,
      type: String,
    },

    avatar: {
      type: String,
    },

    userType: {
      type: String,
      enum: EUserType,
      required: true,
    },

    password: {
      type: String,
    },

    point: {
      type: Number,
    },

    follows: {
      type: [String],
    },

    friends: {
      type: [String],
    },

    workPlace: {
      type: String,
    },

    bio: {
      type: String,
    },

    emailToken: {
      type: String,
    },

    isVerified: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<IUser>(SCHEMA.USER, userSchema);
