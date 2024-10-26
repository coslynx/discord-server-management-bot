import { Router } from 'express';
import { MusicController } from '../services/music.service';

export const musicRouter = Router();

const musicController = new MusicController();

musicRouter.post('/search', musicController.searchMusic);
musicRouter.post('/play', musicController.playMusic);
musicRouter.post('/pause', musicController.pauseMusic);
musicRouter.post('/resume', musicController.resumeMusic);
musicRouter.post('/stop', musicController.stopMusic);
musicRouter.post('/skip', musicController.skipMusic);
musicRouter.post('/queue', musicController.queueMusic);
musicRouter.get('/queue', musicController.getQueue);
musicRouter.post('/volume', musicController.setVolume);
musicRouter.get('/volume', musicController.getVolume);