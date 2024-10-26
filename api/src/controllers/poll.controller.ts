import { Router } from 'express';
import { PollController } from '../services/poll.service';

export const pollRouter = Router();

const pollController = new PollController();

pollRouter.post('/create', pollController.createPoll);
pollRouter.get('/list', pollController.getPolls);
pollRouter.get('/:pollId', pollController.getPoll);
pollRouter.post('/:pollId/vote', pollController.vote);
pollRouter.get('/:pollId/results', pollController.getResults);