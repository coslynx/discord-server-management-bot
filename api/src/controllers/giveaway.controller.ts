import { Router } from 'express';
import { GiveawayController } from '../services/giveaway.service';

export const giveawayRouter = Router();

const giveawayController = new GiveawayController();

giveawayRouter.post('/create', giveawayController.createGiveaway);
giveawayRouter.get('/list', giveawayController.getGiveaways);
giveawayRouter.get('/:giveawayId', giveawayController.getGiveaway);
giveawayRouter.post('/:giveawayId/enter', giveawayController.enterGiveaway);
giveawayRouter.post('/:giveawayId/end', giveawayController.endGiveaway);