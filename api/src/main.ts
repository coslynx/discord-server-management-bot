import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { musicRouter } from './controllers/music.controller';
import { giveawayRouter } from './controllers/giveaway.controller';
import { pollRouter } from './controllers/poll.controller';
import { moderationRouter } from './controllers/moderation.controller';
import { rankingRouter } from './controllers/ranking.controller';
import { userRouter } from './controllers/user.controller';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/music', musicRouter);
app.use('/giveaway', giveawayRouter);
app.use('/poll', pollRouter);
app.use('/moderation', moderationRouter);
app.use('/ranking', rankingRouter);
app.use('/user', userRouter);

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/discord-bot')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`API server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });