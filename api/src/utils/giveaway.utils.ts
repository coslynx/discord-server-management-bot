import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GiveawayEntity } from '../entities/giveaway.entity';
import { CreateGiveawayDto, EnterGiveawayDto, EndGiveawayDto } from '../dto/giveaway.dto';

@Injectable()
export class GiveawayService {
  constructor(
    @InjectRepository(GiveawayEntity)
    private readonly giveawayRepository: Repository<GiveawayEntity>,
  ) {}

  async createGiveaway(
    guildId: string,
    createGiveawayDto: CreateGiveawayDto,
  ): Promise<GiveawayEntity> {
    const giveaway = this.giveawayRepository.create({
      ...createGiveawayDto,
      guildId,
      entries: [],
    });
    return await this.giveawayRepository.save(giveaway);
  }

  async getGiveaways(guildId: string): Promise<GiveawayEntity[]> {
    return await this.giveawayRepository.find({ guildId });
  }

  async getGiveaway(
    guildId: string,
    giveawayId: number,
  ): Promise<GiveawayEntity> {
    const giveaway = await this.giveawayRepository.findOne({
      guildId,
      id: giveawayId,
    });
    if (!giveaway) {
      throw new Error('Giveaway not found');
    }
    return giveaway;
  }

  async enterGiveaway(
    guildId: string,
    giveawayId: number,
    enterGiveawayDto: EnterGiveawayDto,
  ): Promise<GiveawayEntity> {
    const giveaway = await this.giveawayRepository.findOne({
      guildId,
      id: giveawayId,
    });
    if (!giveaway) {
      throw new Error('Giveaway not found');
    }
    if (giveaway.entries.includes(enterGiveawayDto.userId)) {
      throw new Error('User already entered the giveaway');
    }
    giveaway.entries.push(enterGiveawayDto.userId);
    return await this.giveawayRepository.save(giveaway);
  }

  async endGiveaway(
    guildId: string,
    giveawayId: number,
    endGiveawayDto: EndGiveawayDto,
  ): Promise<GiveawayEntity> {
    const giveaway = await this.giveawayRepository.findOne({
      guildId,
      id: giveawayId,
    });
    if (!giveaway) {
      throw new Error('Giveaway not found');
    }
    if (giveaway.ended) {
      throw new Error('Giveaway already ended');
    }
    giveaway.ended = true;
    giveaway.winners = this.selectWinners(giveaway.entries, endGiveawayDto.winners);
    return await this.giveawayRepository.save(giveaway);
  }

  private selectWinners(entries: string[], winners: number): string[] {
    if (entries.length < winners) {
      throw new Error('Not enough entries for the specified number of winners');
    }
    const shuffledEntries = this.shuffleArray(entries);
    return shuffledEntries.slice(0, winners);
  }

  private shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random()  (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}