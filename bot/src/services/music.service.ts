import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MusicEntity } from '../entities/music.entity';
import { CreateMusicDto, UpdateMusicDto } from '../dto/music.dto';

@Injectable()
export class MusicService {
  constructor(
    @InjectRepository(MusicEntity)
    private readonly musicRepository: Repository<MusicEntity>,
  ) {}

  async createMusic(createMusicDto: CreateMusicDto): Promise<MusicEntity> {
    const music = this.musicRepository.create(createMusicDto);
    return await this.musicRepository.save(music);
  }

  async getMusics(guildId: string): Promise<MusicEntity[]> {
    return await this.musicRepository.find({ guildId });
  }

  async getMusic(guildId: string, musicId: number): Promise<MusicEntity> {
    const music = await this.musicRepository.findOne({ guildId, id: musicId });
    if (!music) {
      throw new Error('Music not found');
    }
    return music;
  }

  async updateMusic(
    guildId: string,
    musicId: number,
    updateMusicDto: UpdateMusicDto,
  ): Promise<MusicEntity> {
    const music = await this.musicRepository.findOne({ guildId, id: musicId });
    if (!music) {
      throw new Error('Music not found');
    }
    await this.musicRepository.update({ guildId, id: musicId }, updateMusicDto);
    return await this.musicRepository.findOne({ guildId, id: musicId });
  }

  async deleteMusic(guildId: string, musicId: number): Promise<void> {
    const result = await this.musicRepository.delete({ guildId, id: musicId });
    if (result.affected === 0) {
      throw new Error('Music not found');
    }
  }
}