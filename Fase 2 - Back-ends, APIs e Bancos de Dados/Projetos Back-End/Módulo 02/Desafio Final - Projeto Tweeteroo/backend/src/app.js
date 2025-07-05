import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import usersRoutes from './routes/users.routes.js';
import tweetsRoutes from './routes/tweets.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/sign-up', usersRoutes);
app.use('/tweets', tweetsRoutes);

export default app;
