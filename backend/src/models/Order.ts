import mongoose, { Document, Schema } from 'mongoose';

// Define order status as an enum
enum OrderStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

// Define the order interface that extends Document
interface IOrder extends Document {
  consignor_id: mongoose.Types.ObjectId; // Reference to consignor in Users table
  driver_id: mongoose.Types.ObjectId; // Reference to driver in Users table
  vehicle_id: mongoose.Types.ObjectId; // Reference to vehicle in Vehicles table
  pickup_location: string; // Location for pickup
  dropoff_location: string; // Location for dropoff
  status: OrderStatus; // Order status
  pickup_time?: Date; // Expected or actual pickup time
  dropoff_time?: Date; // Expected or actual dropoff time
  weight: number; // Weight of the goods
  consignor_attachments?: string[]; // Array of URLs for the consignor's documents/images
  driver_attachments?: string[]; // Array of URLs for the driver's documents/images
  createdAt: Date; // Created timestamp
  updatedAt: Date; // Updated timestamp
}

// Create the order schema
const orderSchema: Schema<IOrder> = new Schema(
  {
    consignor_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Reference to the Users table
    },
    driver_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Reference to the Users table
    },
    vehicle_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Vehicle', // Reference to the Vehicles table
    },
    pickup_location: {
      type: String,
      required: true,
    },
    dropoff_location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING, // Default status
    },
    pickup_time: {
      type: Date,
    },
    dropoff_time: {
      type: Date,
    },
    weight: {
      type: Number,
      required: true,
    },
    consignor_attachments: {
      type: [String], // Array of URLs for the consignor's documents/images
      default: [],
    },
    driver_attachments: {
      type: [String], // Array of URLs for the driver's documents/images
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Create the order model
const Order =
  mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);

export { Order, IOrder, OrderStatus };
