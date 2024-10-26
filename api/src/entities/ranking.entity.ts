import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { GuildEntity } from './guild.entity';

@Entity({ name: 'rankings' })
export class RankingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  userId: string;

  @Column({ type: 'int', default: 0 })
  points: number;

  @ManyToOne(() => GuildEntity, (guild) => guild.rankings)
  @JoinColumn({ name: 'guildId' })
  guild: GuildEntity;
}