import mongoose from 'mongoose';
import dotevn from 'dotenv';
dotevn.config();

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('DB connected');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
