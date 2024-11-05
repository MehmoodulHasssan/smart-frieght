import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

// Token generation
const generateToken = (user: any) => {
  // Create a JWT token with user information
  const token = jwt.sign(
    { userId: user._id },
    process.env.TOKEN_KEY as string,
    {
      expiresIn: '1h',
    }
  );
  return token;
};

// Token verification
const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY as string);
    return decoded;
  } catch (error) {
    throw error;
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

export { generateToken, verifyToken, hashPassword, comparePassword };
