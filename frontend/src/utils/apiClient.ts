import { apiEndpoints } from './constants';
import {
  Music,
  MusicInterface,
  CreateMusicDto,
  UpdateMusicDto,
  GiveawayInterface,
  CreateGiveawayDto,
  PollInterface,
  CreatePollDto,
  ModerationInterface,
  UpdateModerationDto,
  RankingInterface,
  UserInterface,
  UpdateUserDto,
} from '../types';
import useSWR from 'swr';

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useGetMusic = (guildId: string) => {
  const { data, error, isLoading } = useSWR(
    apiEndpoints.music.search + '?guildId=' + guildId,
    fetcher,
  );
  return {
    data: data as MusicInterface[],
    isLoading,
    error,
  };
};

export const useCreateMusic = () => {
  const { mutate: createMusic, isLoading, error } = useSWR(
    apiEndpoints.music.create,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );
  return {
    mutate: createMusic,
    isLoading,
    error,
  };
};

export const useUpdateMusic = (guildId: string, musicId: number) => {
  const { mutate: updateMusic, isLoading, error } = useSWR(
    apiEndpoints.music.create + '/' + musicId + '?guildId=' + guildId,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );
  return {
    mutate: updateMusic,
    isLoading,
    error,
  };
};

export const useGetGiveaway = (guildId: string) => {
  const { data, error, isLoading } = useSWR(
    apiEndpoints.giveaway.create + '?guildId=' + guildId,
    fetcher,
  );
  return {
    data: data as GiveawayInterface[],
    isLoading,
    error,
  };
};

export const useCreateGiveaway = () => {
  const { mutate: createGiveaway, isLoading, error } = useSWR(
    apiEndpoints.giveaway.create,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );
  return {
    mutate: createGiveaway,
    isLoading,
    error,
  };
};

export const useGetPoll = (guildId: string) => {
  const { data, error, isLoading } = useSWR(
    apiEndpoints.poll.create + '?guildId=' + guildId,
    fetcher,
  );
  return {
    data: data as PollInterface[],
    isLoading,
    error,
  };
};

export const useCreatePoll = () => {
  const { mutate: createPoll, isLoading, error } = useSWR(
    apiEndpoints.poll.create,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );
  return {
    mutate: createPoll,
    isLoading,
    error,
  };
};

export const useGetModeration = (guildId: string) => {
  const { data, error, isLoading } = useSWR(
    apiEndpoints.moderation.update + '?guildId=' + guildId,
    fetcher,
  );
  return {
    data: data as ModerationInterface[],
    isLoading,
    error,
  };
};

export const useUpdateModeration = () => {
  const { mutate: updateModeration, isLoading, error } = useSWR(
    apiEndpoints.moderation.update,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );
  return {
    mutate: updateModeration,
    isLoading,
    error,
  };
};

export const useGetLeaderboard = (guildId: string) => {
  const { data, error, isLoading } = useSWR(
    apiEndpoints.ranking.leaderboard + '?guildId=' + guildId,
    fetcher,
  );
  return {
    data: data as RankingInterface[],
    isLoading,
    error,
  };
};

export const useGetServer = () => {
  const { data, error, isLoading } = useSWR(
    apiEndpoints.server.getServer,
    fetcher,
  );
  return {
    data: data as {
      name: string;
      id: string;
      memberCount: number;
      createdAt: Date;
    },
    isLoading,
    error,
  };
};

export const useUpdateUser = () => {
  const { mutate: updateUser, isLoading, error } = useSWR(
    apiEndpoints.user.update,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );
  return {
    mutate: updateUser,
    isLoading,
    error,
  };
};