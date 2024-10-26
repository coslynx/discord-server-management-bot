import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { UserEntity } from './entities/user.entity';
import { MusicEntity } from './entities/music.entity';
import { GiveawayEntity } from './entities/giveaway.entity';
import { PollEntity } from './entities/poll.entity';
import { ModerationEntity } from './entities/moderation.entity';
import { RankingEntity } from './entities/ranking.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    UserEntity,
    MusicEntity,
    GiveawayEntity,
    PollEntity,
    ModerationEntity,
    RankingEntity,
  ],
  synchronize: true,
  migrationsRun: false,
  migrations: [join(__dirname, '..', 'migrations//{.ts,.js}')],
  cli: {
    migrationsDir: join(__dirname, '..', 'migrations'),
  },
};