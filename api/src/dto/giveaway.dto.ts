import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDate, Min } from 'class-validator';

export class CreateGiveawayDto {
  @IsString()
  @IsNotEmpty()
  guildId: string;

  @IsString()
  @IsNotEmpty()
  prize: string;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  duration: number;

  @IsDate()
  @IsOptional()
  endsAt?: Date;
}

export class EnterGiveawayDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class EndGiveawayDto {
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  winners: number;
}