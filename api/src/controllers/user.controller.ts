import { Router } from 'express';
import { UserController } from '../services/user.service';

export const userRouter = Router();

const userController = new UserController();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/profile', userController.getProfile);
userRouter.put('/profile', userController.updateProfile);
userRouter.delete('/profile', userController.deleteProfile);