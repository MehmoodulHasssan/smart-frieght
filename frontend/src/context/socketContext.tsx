import { API_DOMAIN } from '@/apiConfig';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthContext } from './authContext';

// Define the context type for Socket.IO
interface SocketContextType {
  socket: Socket | null;
  //   initializeSocket: () => void;
}

// Create the context
const SocketContext = createContext<SocketContextType | undefined>(undefined);

// Socket Provider component
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { currentUser } = useAuthContext();

  //   const initializeSocket = () => {
  //     const socketInstance = io(API_DOMAIN, {
  //       query: {
  //         userId: currentUser?._id,
  //       },
  //     });
  //     setSocket(socketInstance);
  //   };

  useEffect(() => {
    // Initialize the socket connection
    if (!currentUser) return;
    const socketInstance = io(API_DOMAIN, {
      query: {
        userId: currentUser?._id,
      },
    });
    setSocket(socketInstance);

    // Cleanup on component unmount
    return () => {
      socketInstance.disconnect();
    };
  }, [currentUser]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
