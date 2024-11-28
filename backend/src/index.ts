import express, { Request, Response } from 'express';
import { app, httpServer } from './socket';
import { connectDb } from './configureDb';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import ApiError from './utils/ApiError';
import authRouter from './routes/auth.router';
import { NextFunction } from 'migrate';
import { error } from 'console';
import publicRouter from './routes/public.router';
import consignorRouter from './routes/consignor.router';

const port: number = process.env.PORT as unknown as number;

//connect to db
connectDb();

//middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
  })
);

app.use(cookieParser());

//routes
app.get('/', (req, res) => {
  res.send('Hellow world!');
});
app.use('/api/auth', authRouter);
app.use('/api/consignor', consignorRouter);
app.use('/api', publicRouter);

//error handler
app.use(
  (err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
    // console.log(err);
    if (err instanceof ApiError) {
      return res.status(err.status).json({
        message: err.message,
        data: err.data,
      });
    }
    return res.status(500).json({
      message: 'Internal server error occured',
    });
  }
);

//listening to server
httpServer.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
