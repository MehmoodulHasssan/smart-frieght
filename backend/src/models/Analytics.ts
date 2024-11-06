import mongoose, { Document, Schema } from 'mongoose';

// Define the analytics interface that extends Document
interface IAnalytics extends Document {
  date: Date; // Date for which the statistics are recorded
  total_sales: number; // Total revenue on the given date
  completed_orders: number; // Number of completed orders
  canceled_orders: number; // Number of canceled orders
  expected_sales: number; // Expected sales based on the basis of daily sales record till the last month
}

// Create the analytics schema
const analyticsSchema: Schema<IAnalytics> = new Schema(
  {
    date: {
      type: Date,
      required: true,
      unique: true, // Ensure each date has a unique entry
    },
    total_sales: {
      type: Number,
      required: true,
      default: 0, // Default to 0 if not provided
    },
    completed_orders: {
      type: Number,
      required: true,
      default: 0, // Default to 0 if not provided
    },
    canceled_orders: {
      type: Number,
      required: true,
      default: 0, // Default to 0 if not provided
    },
    expected_sales: {
      type: Number,
      required: true,
      default: 0, // Default to 0 if not provided
    },
  },
  {
    timestamps: true,
  }
);

// Create the analytics model
const Analytics = mongoose.model<IAnalytics>('Analytics', analyticsSchema);

export { Analytics, IAnalytics };
