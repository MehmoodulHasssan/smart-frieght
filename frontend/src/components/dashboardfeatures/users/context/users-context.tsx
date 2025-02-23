'use client';
import React, { useState } from 'react';
import useDialogState from '@/hooks/use-dialog-state';
import { IUserRes } from '@/utils/queries';

type UsersDialogType = 'invite' | 'add' | 'edit' | 'delete';

interface UsersContextType {
  open: UsersDialogType | null;
  setOpen: (str: UsersDialogType | null) => void;
  currentRow: IUserRes['data'][number] | null;
  setCurrentRow: React.Dispatch<
    React.SetStateAction<IUserRes['data'][number] | null>
  >;
}

const initialState: UsersContextType = {
  open: null,
  setOpen: () => null,
  currentRow: null,
  setCurrentRow: () => null,
};

const UsersContext = React.createContext(initialState);

interface Props {
  children: React.ReactNode;
}

export default function UsersProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<UsersDialogType>(null);
  const [currentRow, setCurrentRow] = useState<IUserRes['data'][number] | null>(
    null
  );

  return (
    <UsersContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </UsersContext.Provider>
  );
}

export const useUsers = () => {
  const usersContext = React.useContext(UsersContext);

  if (!usersContext) {
    throw new Error('useUsers has to be used within <UsersContext>');
  }

  return usersContext;
};
