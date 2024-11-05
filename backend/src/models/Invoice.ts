import mongoose, { Document, Schema } from 'mongoose';

// Define invoice status as an enum
enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  OVERDUE = 'overdue',
}

// Define payment type as an enum
enum PaymentType {
  ONLINE_PAYMENT = 'online_payment',
  CASH_ON_DELIVERY = 'cash_on_delivery',
}

// Define the invoice interface that extends Document
interface IInvoice extends Document {
  order_id: mongoose.Types.ObjectId; // Reference to the order in the Orders table
  amount: number; // Total amount for the order
  payment_type: PaymentType; // Type of payment
  status: PaymentStatus; // Payment status controlled by admin
  createdAt: Date; // Created timestamp
  updatedAt: Date; // Updated timestamp
}

// Create the invoice schema
const invoiceSchema: Schema<IInvoice> = new Schema(
  {
    order_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Order', // Reference to the Orders table
    },
    amount: {
      type: Number,
      required: true,
    },
    payment_type: {
      type: String,
      enum: Object.values(PaymentType),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING, // Default status
    },
  },
  {
    timestamps: true,
  }
);

// Create the invoice model
const Invoice =
  mongoose.models.Invoice || mongoose.model<IInvoice>('Invoice', invoiceSchema);

export { Invoice, IInvoice, PaymentType, PaymentStatus };
