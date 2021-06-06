import { createConnection } from 'typeorm';
import { User } from './entities/User';
import express from 'express';
import morgan from 'morgan';

import authRoutes from './routes/auth';
import trim from './middleware/trim';

//initialize express app
const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(trim);

//routes
app.get('/', (_, res) => {
  res.send('hello world');
});
app.use('/api/auth', authRoutes);

//server connection
app.listen(5000, async () => {
  console.log('server running at http://localhost:5000');
  try {
    await createConnection();

    console.log('Database connected');
  } catch (err) {
    console.log(err);
  }
});
