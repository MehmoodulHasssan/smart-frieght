import mongoose, { Document, Schema } from 'mongoose';

// Define vehicle status as an enum
enum VehicleStatus {
  AVAILABLE = 'AVAILABLE',
  IN_TRANSIT = 'IN_TRANSIT',
}

// Define the vehicle interface that extends Document
interface IVehicle extends Document {
  licence_plate: string; // Unique identifier for the vehicle
  vehicle_model: string; // Specific model of the vehicle
  capacity: number; // Vehicle capacity (weight)
  status: VehicleStatus; // Availability status
  avg_fuel_consumption: number; // Fuel consumption per kilometer
  notes?: string;
  createdAt: Date; // Created timestamp
  updatedAt: Date; // Updated timestamp
}

// Create the vehicle schema
const vehicleSchema: Schema<IVehicle> = new Schema(
  {
    licence_plate: {
      type: String,
      required: true,
      unique: true, // Ensure each license plate is unique
      trim: true,
    },
    vehicle_model: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(VehicleStatus),
      default: VehicleStatus.AVAILABLE, // Default status
    },
    avg_fuel_consumption: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create the vehicle model
const Vehicle = mongoose.model<IVehicle>('Vehicle', vehicleSchema);

export { Vehicle, IVehicle, VehicleStatus };
