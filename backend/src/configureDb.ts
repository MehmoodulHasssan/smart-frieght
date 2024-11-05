import mongoose from 'mongoose';
import dotevn from 'dotenv';
dotevn.config();

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log('DB connected');
  } catch (error) {
    console.log(error);
  }
};
