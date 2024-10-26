import { IsString, IsOptional, IsNotEmpty, IsEnum, IsBoolean } from 'class-validator';
import { ModerationAction } from '../enums/moderation.enum';

export class CreateModerationDto {
  @IsString()
  @IsNotEmpty()
  guildId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEnum(ModerationAction)
  @IsNotEmpty()
  action: ModerationAction;

  @IsString()
  @IsOptional()
  reason?: string;
}

export class UpdateModerationDto {
  @IsString()
  @IsOptional()
  reason?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}