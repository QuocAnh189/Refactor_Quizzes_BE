import { ObjectId } from 'mongodb';

export interface IGrade {
  _id?: ObjectId;
  name: string;
}
