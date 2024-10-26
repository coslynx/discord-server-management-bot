import { Ranking } from './ranking.entity';

export interface RankingInterface extends Ranking {
  guildId: string;
  userId: string;
  points: number;
}