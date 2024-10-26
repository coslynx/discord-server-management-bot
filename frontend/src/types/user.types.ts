import { User } from './user.entity';

export interface UserInterface extends User {
  token: string;
}