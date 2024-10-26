import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MusicEntity } from '../entities/music.entity';
import { CreateMusicDto, UpdateMusicDto } from '../dto/music.dto';
import { MusicInterface } from '../interfaces/music.interface';
import ytsr from 'ytsr';
import ytdl from 'ytdl-core';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MusicUtils {
  constructor(
    @InjectRepository(MusicEntity)
    private readonly musicRepository: Repository<MusicEntity>,
  ) {}

  async searchMusic(query: string): Promise<MusicInterface[]> {
    try {
      const searchResults = await ytsr(query, { limit: 10 });
      const musics: MusicInterface[] = searchResults.items.map((item) => ({
        guildId: '',
        title: item.title,
        artist: item.author.name,
        url: item.url,
        thumbnailUrl: item.thumbnail.url,
        duration: item.duration,
        lyrics: '',
        queued: false,
      }));
      return musics;
    } catch (error) {
      throw new Error('Failed to search music');
    }
  }

  async getMusicInfo(url: string): Promise<MusicInterface> {
    try {
      const info = await ytdl.getInfo(url);
      const music: MusicInterface = {
        guildId: '',
        title: info.videoDetails.title,
        artist: info.videoDetails.author.name,
        url,
        thumbnailUrl: info.videoDetails.thumbnails[0].url,
        duration: info.videoDetails.lengthSeconds,
        lyrics: '',
        queued: false,
      };
      return music;
    } catch (error) {
      throw new Error('Failed to get music info');
    }
  }

  async createMusic(
    guildId: string,
    music: MusicInterface,
  ): Promise<MusicInterface> {
    try {
      const newMusic = this.musicRepository.create(music);
      newMusic.guildId = guildId;
      const savedMusic = await this.musicRepository.save(newMusic);
      return savedMusic;
    } catch (error) {
      throw new Error('Failed to create music');
    }
  }

  async updateMusic(
    guildId: string,
    musicId: number,
    updateMusicDto: UpdateMusicDto,
  ): Promise<MusicInterface> {
    try {
      const music = await this.musicRepository.findOne({
        guildId,
        id: musicId,
      });
      if (!music) {
        throw new Error('Music not found');
      }
      await this.musicRepository.update({ guildId, id: musicId }, updateMusicDto);
      const updatedMusic = await this.musicRepository.findOne({
        guildId,
        id: musicId,
      });
      return updatedMusic;
    } catch (error) {
      throw new Error('Failed to update music');
    }
  }

  async deleteMusic(guildId: string, musicId: number): Promise<void> {
    try {
      const result = await this.musicRepository.delete({ guildId, id: musicId });
      if (result.affected === 0) {
        throw new Error('Music not found');
      }
    } catch (error) {
      throw new Error('Failed to delete music');
    }
  }

  async downloadMusic(url: string): Promise<string> {
    try {
      const musicDir = join(__dirname, '..', '..', 'uploads', 'music');
      if (!existsSync(musicDir)) {
        mkdirSync(musicDir, { recursive: true });
      }
      const fileName = `${uuidv4()}.mp3`;
      const filePath = join(musicDir, fileName);
      const stream = ytdl(url, { filter: 'audioonly' });
      stream.pipe(createWriteStream(filePath));
      return filePath;
    } catch (error) {
      throw new Error('Failed to download music');
    }
  }
}