import { createServer } from 'http';
import { Server } from 'socket.io';
import express, { Application } from 'express';

const app: Application = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

export { io, httpServer, app };
