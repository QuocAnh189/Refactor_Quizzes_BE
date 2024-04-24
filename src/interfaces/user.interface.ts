import { ObjectId } from 'mongodb';

export interface IUser {
  _id?: ObjectId;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  avatar: string;
  userType: string;
  password?: string;
  point: number;
  follows: ObjectId[];
  friends: ObjectId[];
  isVerified: boolean;
  emailToken: string;
  workPlace: string;
  bio: string;
}
