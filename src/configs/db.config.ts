import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI_PRODUCT);
    return connect;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
