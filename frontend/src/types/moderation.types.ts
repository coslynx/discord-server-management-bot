import { ModerationAction } from './moderation.enum';

export interface ModerationInterface {
  guildId: string;
  userId: string;
  action: ModerationAction;
  reason?: string;
  active?: boolean;
}