import { createConnection } from 'typeorm';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

import authRoutes from './routes/auth';
import postRoutes from './routes/posts';
import subRoutes from './routes/subs';
import miscRoutes from './routes/misc';
import userRoutes from './routes/users';

import trim from './middleware/trim';

const PORT = process.env.PORT;
//initialize express app
const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(trim);
app.set('trust proxy', 1);
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  })
);

app.use(express.static('public'));

//routes
app.get('/api', (_, res) => {
  res.send('hello world');
});
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/subs', subRoutes);
app.use('/api/misc', miscRoutes);
app.use('/api/users', userRoutes);

//server connection
app.listen(PORT, async () => {
  console.log(`server running at http://localhost:${PORT}`);
  try {
    await createConnection();

    console.log('Database connected');
  } catch (err) {
    console.log(err);
  }
});
