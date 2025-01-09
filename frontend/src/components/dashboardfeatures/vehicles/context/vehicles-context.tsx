'use client';
import React, { useState } from 'react';
import useDialogState from '@/hooks/use-dialog-state';
import { IVehicleRes } from '@/utils/queries';

type VehiclesDialogType = 'invite' | 'add' | 'edit' | 'delete';

interface VehiclesContextType {
  open: VehiclesDialogType | null;
  setOpen: (str: VehiclesDialogType | null) => void;
  currentRow: IVehicleRes['data'][number] | null;
  setCurrentRow: React.Dispatch<
    React.SetStateAction<IVehicleRes['data'][number] | null>
  >;
}

const initialState: VehiclesContextType = {
  open: null,
  setOpen: () => null,
  currentRow: null,
  setCurrentRow: () => null,
};

const VehiclesContext = React.createContext(initialState);

interface Props {
  children: React.ReactNode;
}

export default function VehiclesProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<VehiclesDialogType>(null);
  const [currentRow, setCurrentRow] = useState<
    IVehicleRes['data'][number] | null
  >(null);

  return (
    <VehiclesContext.Provider
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </VehiclesContext.Provider>
  );
}

export const useVehicles = () => {
  const vehiclesContext = React.useContext(VehiclesContext);

  if (!vehiclesContext) {
    throw new Error('useVehicles has to be used within <VehiclesContext>');
  }

  return vehiclesContext;
};
