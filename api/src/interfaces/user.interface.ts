import { User } from '../entities/user.entity';

export interface UserInterface extends User {
  token: string;
}