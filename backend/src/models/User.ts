import mongoose, { Document, InferSchemaType, Schema } from 'mongoose';
import { hashPassword } from '../utils/authUtils';

// Define user roles as an enum
enum UserRole {
  ADMIN = 'admin',
  CONSIGNOR = 'consignor',
  DRIVER = 'driver',
}

// Define the user interface that extends Document
interface IUser extends Document {
  driver: mongoose.Types.ObjectId;
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  role: UserRole;
  profile_picture?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create the user schema
const userSchema: Schema<IUser> = new Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone_number: {
      type: String,
      required: true,
      unique: true,
    },
    profile_picture: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      // select: false,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.CONSIGNOR,
      //default role has been set to consignor as of most use cases
    },
    driver: {
      type: Schema.Types.ObjectId,
      ref: 'Driver',
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// create a pre function to hash the password before saving it to the database
userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  hashPassword(user.password)
    .then((hashedPassword) => {
      user.password = hashedPassword;
      next();
    })
    .catch((error) => {
      next(error);
    });
});

// userSchema.post('save', async function (error, doc, next) {

// })

const User = mongoose.model<IUser>('User', userSchema);
export { UserRole, User, IUser };
// export { User, IUser, UserRole };
