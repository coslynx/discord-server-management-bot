import { IsString, IsNotEmpty, IsOptional, IsArray, IsNumber, Min, IsDate } from 'class-validator';

export class CreatePollDto {
  @IsString()
  @IsNotEmpty()
  guildId: string;

  @IsString()
  @IsNotEmpty()
  question: string;

  @IsArray()
  @IsNotEmpty()
  options: { name: string; votes: number }[];

  @IsDate()
  @IsOptional()
  endsAt?: Date;
}

export class UpdatePollDto {
  @IsString()
  @IsOptional()
  question?: string;

  @IsArray()
  @IsOptional()
  options?: { name: string; votes: number }[];

  @IsDate()
  @IsOptional()
  endsAt?: Date;
}

export class VoteDto {
  @IsString()
  @IsNotEmpty()
  option: string;
}