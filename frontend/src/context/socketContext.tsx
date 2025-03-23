import { API_BASE_URL, API_DOMAIN } from '@/apiConfig';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthContext } from './authContext';
import { toast } from '@/hooks/use-toast';

// Define the context type for Socket.IO
interface SocketContextType {
  socket: Socket | null;
  connectToSocket: () => void;
  disconnectFromSocket: () => void;
  sendLocationStreams: () => void;
  abortLocationStreams: () => void;
  currWatchId: number | null;
}

// Create the context
const SocketContext = createContext<SocketContextType | undefined>(undefined);

// Socket Provider component
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { currentUser } = useAuthContext();
  const watchIdRef = useRef<number | null>(null);

  const connectToSocket = () => {
    if (socket) {
      return;
    }
    console.log('connecting to socket...');
    const socketInstance = io(API_BASE_URL, {
      query: {
        userId: currentUser?._id,
      },
      withCredentials: true,
    });
    //here add any event listner needed wtih reference to this socket

    setSocket(socketInstance);
  };

  const sendLocationStreams = () => {
    watchIdRef.current = navigator.geolocation.watchPosition(
      //if permission granted
      (position) => {
        socket?.emit('locationEvent', position.coords);
      },
      //if permission denied
      (error) => {
        console.log(error);
        watchIdRef.current = null;
        if (error.code === 1) {
          toast({
            title: 'Error',
            description: 'Location permission denied',
            variant: 'destructive',
          });
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const abortLocationStreams = () => {
    if (!watchIdRef.current) return;
    navigator.geolocation.clearWatch(watchIdRef.current);
    watchIdRef.current = null;
  };

  const disconnectFromSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  useEffect(() => {
    // Initialize the socket connection
    if (!currentUser) return;
    connectToSocket();

    // Cleanup on component unmount
    return () => {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    };
  }, [currentUser, socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        currWatchId: watchIdRef.current,
        connectToSocket,
        disconnectFromSocket,
        sendLocationStreams,
        abortLocationStreams,
      }}
    >
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
