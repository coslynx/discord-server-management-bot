import { Poll } from '../entities/poll.entity';

export interface PollInterface extends Poll {
  guildId: string;
  question: string;
  options: { name: string; votes: number }[];
  createdAt: Date;
  endsAt?: Date;
}