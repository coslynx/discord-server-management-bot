import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModerationEntity } from '../entities/moderation.entity';
import { CreateModerationDto, UpdateModerationDto } from '../dto/moderation.dto';

@Injectable()
export class ModerationService {
  constructor(
    @InjectRepository(ModerationEntity)
    private readonly moderationRepository: Repository<ModerationEntity>,
  ) {}

  async createModeration(createModerationDto: CreateModerationDto): Promise<ModerationEntity> {
    const moderation = this.moderationRepository.create(createModerationDto);
    return await this.moderationRepository.save(moderation);
  }

  async getModerations(guildId: string): Promise<ModerationEntity[]> {
    return await this.moderationRepository.find({ guildId });
  }

  async getModeration(guildId: string, moderationId: number): Promise<ModerationEntity> {
    const moderation = await this.moderationRepository.findOne({ guildId, id: moderationId });
    if (!moderation) {
      throw new Error('Moderation not found');
    }
    return moderation;
  }

  async updateModeration(
    guildId: string,
    moderationId: number,
    updateModerationDto: UpdateModerationDto,
  ): Promise<ModerationEntity> {
    const moderation = await this.moderationRepository.findOne({ guildId, id: moderationId });
    if (!moderation) {
      throw new Error('Moderation not found');
    }
    await this.moderationRepository.update({ guildId, id: moderationId }, updateModerationDto);
    return await this.moderationRepository.findOne({ guildId, id: moderationId });
  }

  async deleteModeration(guildId: string, moderationId: number): Promise<void> {
    const result = await this.moderationRepository.delete({ guildId, id: moderationId });
    if (result.affected === 0) {
      throw new Error('Moderation not found');
    }
  }
}