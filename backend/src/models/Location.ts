import mongoose, { Document, Schema } from 'mongoose';

// Define the invoice interface that extends Document
interface ILocation extends Document {
  latitude: number;
  longitude: number;
  address: string;
  createdAt: Date; // Created timestamp
  updatedAt: Date; // Updated timestamp
}

// Create the location schema
const locationSchema: Schema<ILocation> = new Schema(
  {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create the location model
const Location = mongoose.model<ILocation>('Location', locationSchema);

export { Location, ILocation };
