import React, { useState } from 'react';
import useDialogState from '@/hooks/use-dialog-state';
import { IOrderRes } from '@/utils/queries';
// import { Order } from '../data/schema';

type OrdersDialogType = 'create' | 'update' | 'delete' | 'details' | 'route';

interface OrdersContextType {
  open: OrdersDialogType | null;
  setOpen: (str: OrdersDialogType | null) => void;
  currentRow: IOrderRes['data'][number] | null;
  setCurrentRow: React.Dispatch<
    React.SetStateAction<IOrderRes['data'][number] | null>
  >;
}

const OrdersContext = React.createContext<OrdersContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function OrdersProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<OrdersDialogType>(null);
  const [currentRow, setCurrentRow] = useState<
    IOrderRes['data'][number] | null
  >(null);
  return (
    <OrdersContext.Provider
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export const useOrders = () => {
  const ordersContext = React.useContext(OrdersContext);

  if (!ordersContext) {
    throw new Error('useOrders has to be used within <OrdersContext>');
  }

  return ordersContext;
};
