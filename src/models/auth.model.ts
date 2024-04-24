//mongoose
import { Schema, model } from 'mongoose';

//schema
import { SCHEMA } from '@/constants/schema';

// const accessTokenSchema = new Schema(
//   {
//     user_id: { type: SchemaTypes.ObjectId, ref: SCHEMA.USER },
//     token: { type: String, unique: true },
//   },

//   {
//     timestamps: true,
//   },
// );

const refreshTokenSchema = new Schema(
  {
    user_id: { type: Schema.ObjectId, ref: SCHEMA.USER },
    token: { type: String, unique: true },
  },

  {
    timestamps: true,
  },
);

// export const AccessToken = model(SCHEMA.ACCESS_TOKEN, accessTokenSchema);
export const RefreshToken = model(SCHEMA.REFRESH_TOKEN, refreshTokenSchema);
