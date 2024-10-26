import { ModerationAction } from '../enums/moderation.enum';

export interface ModerationInterface {
  guildId: string;
  userId: string;
  action: ModerationAction;
  reason?: string;
  active?: boolean;
}