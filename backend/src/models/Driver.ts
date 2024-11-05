import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

// Define driver status as an enum
enum DriverStatus {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
}

// Define the driver interface that extends Document
interface IDriver extends Document {
  user_id: mongoose.Types.ObjectId; // Reference to the user_id in the users table
  licence_no: string;
  status: DriverStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Create the driver schema
const driverSchema: Schema<IDriver> = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
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
  },
  {
    timestamps: true,
  }
);

// Create the driver model
const Driver =
  mongoose.models.Driver || mongoose.model<IDriver>('Driver', driverSchema);

export { Driver, IDriver, DriverStatus };
