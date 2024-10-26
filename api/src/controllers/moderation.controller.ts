import { Router } from 'express';
import { ModerationController } from '../services/moderation.service';

export const moderationRouter = Router();

const moderationController = new ModerationController();

moderationRouter.post('/filter', moderationController.filterMessage);
moderationRouter.post('/mute', moderationController.muteUser);
moderationRouter.post('/unmute', moderationController.unmuteUser);
moderationRouter.post('/kick', moderationController.kickUser);
moderationRouter.post('/ban', moderationController.banUser);
moderationRouter.post('/warn', moderationController.warnUser);
moderationRouter.post('/clear', moderationController.clearMessages);