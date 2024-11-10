import { model, Schema } from 'mongoose';
import { OrderStatus } from './Order';

interface IOrderHistory {
  order_id: string;
  status: OrderStatus;
}
const orderHistorySchema = new Schema(
  {
    order_id: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OrderHistory = model<IOrderHistory>('OrderHistory', orderHistorySchema);

export { OrderHistory, IOrderHistory };
