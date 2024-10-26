import { Giveaway } from './giveaway.entity';

export interface GiveawayInterface extends Giveaway {
  guildId: string;
  prize: string;
  duration: number;
  createdAt: Date;
  endsAt?: Date;
  entries: string[];
  winners: string[];
  ended: boolean;
}