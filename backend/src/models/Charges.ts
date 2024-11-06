import mongoose, { Document, mongo, Schema } from 'mongoose';

// Define the charges interface that extends Document
interface ICharges extends Document {
  driver_cost: number; // Per mileage cost that has to be paid to the driver
  goods_cost: number; // Per mileage cost of goods per kg of its weight
}

// Create the charges schema
const chargesSchema: Schema<ICharges> = new Schema(
  {
    driver_cost: {
      type: Number,
      required: true,
      default: 0, // Default value for the driver cost
    },
    goods_cost: {
      type: Number,
      required: true,
      default: 0, // Default value for the goods cost
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the charges model
const Charges = mongoose.model<ICharges>('Charges', chargesSchema);

export { Charges, ICharges };
