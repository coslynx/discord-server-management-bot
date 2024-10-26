import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateRankingDto {
  @IsString()
  userId: string;

  @IsNumber()
  @Min(0)
  points: number;
}

export class UpdateRankingDto {
  @IsNumber()
  @Min(0)
  @IsOptional()
  points?: number;
}