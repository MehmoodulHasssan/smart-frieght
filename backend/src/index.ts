import express, { Request, Response } from 'express';
import { app, httpServer } from './socket';
import { connectDb } from './configureDb';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import ApiError from './utils/ApiError';

const port: number = process.env.PORT as unknown as number;

//connect to db
connectDb();

//middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
  })
);
app.use(cookieParser());

//routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.use('/api/auth');

//error handler
app.use((err: any, req: Request, res: Response, next: any) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      messge: err.message,
    });
  }
  return res.status(500).json({
    message: 'Internal server error occured',
  });
});

//listening to server
httpServer.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
