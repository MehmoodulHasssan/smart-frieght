import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import ApiError from './ApiError';
import { Types } from 'mongoose';
import { IUser, User } from '../models/User';
dotenv.config();

// Token generation
const generateToken = (userId: Types.ObjectId) => {
  // Create a JWT token with user information
  const token = jwt.sign(
    { _id: userId },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY as string,
    }
  );
  return token;
};

// Token verification
const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    );
    return decoded as { _id: string };
  } catch (error) {
    console.log(error);
    throw ApiError.unauthorized('Invalid access token');
  }
};

// Password hashing
const hashPassword = async (password: string) => {
  const saltRounds = 10; // Adjust salt rounds as needed
  const hashedPassword = await bcryptjs.hash(password, saltRounds);
  return hashedPassword;
};

// Password comparison
const comparePassword = async (password: string, hashedPassword: string) => {
  const match = await bcryptjs.compare(password, hashedPassword);
  return match;
};

const findUserById = async (userId: string) => {
  try {
    const user = await User.findById(userId).lean();
    return user as IUser;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export {
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword,
  findUserById,
};
