import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RankingEntity } from '../entities/ranking.entity';
import { CreateRankingDto, UpdateRankingDto } from '../dto/ranking.dto';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(RankingEntity)
    private readonly rankingRepository: Repository<RankingEntity>,
  ) {}

  async createRanking(createRankingDto: CreateRankingDto): Promise<RankingEntity> {
    const ranking = this.rankingRepository.create(createRankingDto);
    return await this.rankingRepository.save(ranking);
  }

  async getLeaderboard(guildId: string, limit: number): Promise<RankingEntity[]> {
    return await this.rankingRepository.find({
      where: { guildId },
      order: { points: 'DESC' },
      take: limit,
    });
  }

  async getUserRanking(guildId: string, userId: string): Promise<RankingEntity> {
    const ranking = await this.rankingRepository.findOne({ guildId, userId });
    if (!ranking) {
      throw new Error('Ranking not found');
    }
    return ranking;
  }

  async updateRanking(
    guildId: string,
    userId: string,
    updateRankingDto: UpdateRankingDto,
  ): Promise<RankingEntity> {
    const ranking = await this.rankingRepository.findOne({ guildId, userId });
    if (!ranking) {
      throw new Error('Ranking not found');
    }
    await this.rankingRepository.update({ guildId, userId }, updateRankingDto);
    return await this.rankingRepository.findOne({ guildId, userId });
  }

  async deleteRanking(guildId: string, userId: string): Promise<void> {
    const result = await this.rankingRepository.delete({ guildId, userId });
    if (result.affected === 0) {
      throw new Error('Ranking not found');
    }
  }
}