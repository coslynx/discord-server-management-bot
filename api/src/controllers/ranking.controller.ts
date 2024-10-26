import { Router } from 'express';
import { RankingController } from '../services/ranking.service';

export const rankingRouter = Router();

const rankingController = new RankingController();

rankingRouter.get('/leaderboard', rankingController.getLeaderboard);
rankingRouter.get('/user/:userId', rankingController.getUserRanking);
rankingRouter.post('/update', rankingController.updateRanking);