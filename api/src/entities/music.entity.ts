import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { GuildEntity } from './guild.entity';

@Entity({ name: 'musics' })
export class MusicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  guildId: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  artist: string;

  @Column({ type: 'varchar', length: 255 })
  url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  thumbnailUrl: string;

  @Column({ type: 'int', default: 0 })
  duration: number;

  @Column({ type: 'text', nullable: true })
  lyrics: string;

  @Column({ type: 'boolean', default: false })
  queued: boolean;

  @ManyToOne(() => GuildEntity, (guild) => guild.musics)
  @JoinColumn({ name: 'guildId' })
  guild: GuildEntity;
}