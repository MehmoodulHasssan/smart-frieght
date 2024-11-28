import mongoose, { Document, Schema } from 'mongoose';

// Define the invoice interface that extends Document
interface ICity extends Document {
  name: string; // City name
  northeast_latitude: number;
  northeast_longitude: number;
  southwest_latitude: number;
  southwest_longitude: number;
  createdAt: Date; // Created timestamp
  updatedAt: Date; // Updated timestamp
}

// Create the city schema
const citySchema: Schema<ICity> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    northeast_latitude: {
      type: Number,
      required: true,
    },
    northeast_longitude: {
      type: Number,
      required: true,
    },
    southwest_latitude: {
      type: Number,
      required: true,
    },
    southwest_longitude: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create the city model
const City = mongoose.model<ICity>('City', citySchema);

export { City, ICity };
