import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { GuildEntity } from './guild.entity';

@Entity({ name: 'polls' })
export class PollEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  guildId: string;

  @Column({ type: 'varchar', length: 255 })
  question: string;

  @Column({ type: 'json', default: '[]' })
  options: { name: string; votes: number }[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  endsAt: Date;

  @ManyToOne(() => GuildEntity, (guild) => guild.polls)
  @JoinColumn({ name: 'guildId' })
  guild: GuildEntity;
}