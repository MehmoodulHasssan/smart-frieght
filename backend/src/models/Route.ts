import mongoose, { Document, Schema } from 'mongoose';

// Define the route interface that extends Document
interface IRoute extends Document {
  geometry: string;
  distance: number;
  duration: number;
}

// Create the route schema
const routeSchema: Schema<IRoute> = new Schema(
  {
    geometry: String,
    distance: Number,
    duration: Number,
  },
  {
    timestamps: true,
  }
);

// Create the route model
const Route = mongoose.model<IRoute>('Route', routeSchema);

export { Route, IRoute };
