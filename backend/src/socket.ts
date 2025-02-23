import { createServer } from 'http';
import { Server } from 'socket.io';
import express, { Application } from 'express';
import { findUserById, verifyToken } from './utils/authUtils';
import { IUser, UserRole } from './models/User';

const app: Application = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
  },
});

const connectedDrivers = new Map<string, IUser>();

let adminSocketId = '';

io.on('connection', async (socket) => {
  const cookie = socket.handshake.headers.cookie as string;
  const token = cookie.split('=')[1];
  if (!token) {
    console.log('no token found');
    socket.disconnect();
  }

  try {
    const { _id } = verifyToken(token);
    //check if user exists for this id
    const isUser = await findUserById(_id);
    if (!isUser) {
      socket.disconnect();
      return;
    }

    //if the user is admin
    if (isUser.role === UserRole.ADMIN) {
      console.log(`admin connected with socket id ${socket.id}`);
      adminSocketId = socket.id;
    }

    //if the user is driver
    if (isUser.role === UserRole.DRIVER) {
      console.log(
        `driver ${isUser.full_name} connected with socket id ${socket.id}`
      );
      //add user to connected drivers hash map
      connectedDrivers.set(socket.id, isUser);

      //then add event listener that listen's to location updates from driver client
      socket.on('locationEvent', (data) => {
        const driver = connectedDrivers.get(socket.id);
        console.log(`location update for ${driver?.full_name}`, data);
        socket.to(adminSocketId).emit('locationEvent', {
          driverId: driver?._id,
          location: data,
        });
      });
    }
  } catch (error) {
    socket.disconnect();
  }

  socket.on('disconnect', () => {
    if (connectedDrivers.has(socket.id)) {
      console.log(
        `driver ${connectedDrivers.get(socket.id)?.full_name} disconnected`
      );
      connectedDrivers.delete(socket.id);
    }
    if (socket.id === adminSocketId) {
      console.log('admin disconnected');
      adminSocketId = '';
    }
  });
});

export { io, httpServer, app };
