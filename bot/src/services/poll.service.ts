import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PollEntity } from '../entities/poll.entity';
import { CreatePollDto, UpdatePollDto, VoteDto } from '../dto/poll.dto';

@Injectable()
export class PollService {
  constructor(
    @InjectRepository(PollEntity)
    private readonly pollRepository: Repository<PollEntity>,
  ) {}

  async createPoll(createPollDto: CreatePollDto): Promise<PollEntity> {
    const poll = this.pollRepository.create(createPollDto);
    return await this.pollRepository.save(poll);
  }

  async getPolls(guildId: string): Promise<PollEntity[]> {
    return await this.pollRepository.find({ guildId });
  }

  async getPoll(guildId: string, pollId: number): Promise<PollEntity> {
    const poll = await this.pollRepository.findOne({ guildId, id: pollId });
    if (!poll) {
      throw new Error('Poll not found');
    }
    return poll;
  }

  async vote(guildId: string, pollId: number, voteDto: VoteDto): Promise<PollEntity> {
    const poll = await this.pollRepository.findOne({ guildId, id: pollId });
    if (!poll) {
      throw new Error('Poll not found');
    }
    const optionIndex = poll.options.findIndex(
      (option) => option.name === voteDto.option,
    );
    if (optionIndex === -1) {
      throw new Error('Invalid option');
    }
    poll.options[optionIndex].votes++;
    return await this.pollRepository.save(poll);
  }

  async getResults(guildId: string, pollId: number): Promise<PollEntity> {
    const poll = await this.pollRepository.findOne({ guildId, id: pollId });
    if (!poll) {
      throw new Error('Poll not found');
    }
    return poll;
  }

  async updatePoll(
    guildId: string,
    pollId: number,
    updatePollDto: UpdatePollDto,
  ): Promise<PollEntity> {
    const poll = await this.pollRepository.findOne({ guildId, id: pollId });
    if (!poll) {
      throw new Error('Poll not found');
    }
    await this.pollRepository.update({ guildId, id: pollId }, updatePollDto);
    return await this.pollRepository.findOne({ guildId, id: pollId });
  }

  async deletePoll(guildId: string, pollId: number): Promise<void> {
    const result = await this.pollRepository.delete({ guildId, id: pollId });
    if (result.affected === 0) {
      throw new Error('Poll not found');
    }
  }
}