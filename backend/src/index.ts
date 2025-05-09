import express, { Request, Response } from 'express';
import { app, httpServer } from './socket';
import { connectDb } from './configureDb';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import ApiError from './utils/ApiError';
import authRouter from './routes/auth.router';
import { NextFunction } from 'migrate';
import publicRouter from './routes/public.router';
import consignorRouter from './routes/consignor.router';
import adminRouter from './routes/admin.router';
import driverRouter from './routes/driver.router';

const port = process.env.PORT;

//connect to db
connectDb();

//middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://192.168.1.**:3000',
      'https://matrix-beginner-massive-removing.trycloudflare.com',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
  })
);

app.use(cookieParser());

//routes
app.get('/', (req, res) => {
  res.send('Hellow world!');
});
app.use('/api', publicRouter);
app.use('/api/auth', authRouter);
app.use('/api/consignor', consignorRouter);
app.use('/api/admin', adminRouter);
app.use('/api/driver', driverRouter);

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
