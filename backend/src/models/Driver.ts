import mongoose, { Document, InferSchemaType, Schema } from 'mongoose';
import { User } from './User';
import { NextFunction } from 'express';

// Define driver status as an enum
enum DriverStatus {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
}

// Define the driver interface that extends Document
interface IDriver extends Document {
  user: Schema.Types.ObjectId;
  licence_no: string;
  status: DriverStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Create the driver schema
const driverSchema: Schema<IDriver> = new Schema(
  {
    licence_no: {
      type: String,
      required: true,
      unique: true, // Ensure each license number is unique
    },
    status: {
      type: String,
      enum: Object.values(DriverStatus),
      default: DriverStatus.UNAVAILABLE, // Default status
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

driverSchema.pre('save', async function (next) {
  const isUser = await User.findById(this.user);
  if (!isUser) {
    await this.deleteOne();
    return next();
  }
  if (isUser?.driver === this._id) return next();
  console.log(this._id);
  isUser.driver = this._id as any;
  // console.log('saving driver to user');
  await isUser.save();
  next();
});

// Create the driver model
const Driver = mongoose.model<IDriver>('Driver', driverSchema);
// const Driver =
//   mongoose.models.Driver || mongoose.model<IDriver>('Driver', driverSchema);

export { DriverStatus, Driver };
