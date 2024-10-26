import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { GuildEntity } from './guild.entity';

@Entity({ name: 'giveaways' })
export class GiveawayEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  guildId: string;

  @Column({ type: 'varchar', length: 255 })
  prize: string;

  @Column({ type: 'int' })
  duration: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  endsAt: Date;

  @Column({ type: 'json', default: '[]' })
  entries: string[];

  @Column({ type: 'json', default: '[]' })
  winners: string[];

  @Column({ type: 'boolean', default: false })
  ended: boolean;

  @ManyToOne(() => GuildEntity, (guild) => guild.giveaways)
  @JoinColumn({ name: 'guildId' })
  guild: GuildEntity;
}