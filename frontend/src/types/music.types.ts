import { Music } from './music.entity';

export interface MusicInterface extends Music {
  guildId: string;
  title: string;
  artist: string;
  url: string;
  thumbnailUrl?: string;
  duration: number;
  lyrics?: string;
  queued: boolean;
}