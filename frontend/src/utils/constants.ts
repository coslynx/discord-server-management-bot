export const apiEndpoints = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
  },
  music: {
    create: '/api/music/create',
    search: '/api/music/search',
  },
  giveaway: {
    create: '/api/giveaway/create',
  },
  poll: {
    create: '/api/poll/create',
  },
  moderation: {
    update: '/api/moderation/update',
  },
  ranking: {
    leaderboard: '/api/ranking/leaderboard',
  },
  server: {
    getServer: '/api/server/getServer',
  },
  user: {
    update: '/api/user/update',
  },
};

export const roles = {
  admin: 'admin',
  user: 'user',
};

export const navigationItems = [
  {
    label: 'Music',
    path: '/music',
  },
  {
    label: 'Giveaway',
    path: '/giveaway',
  },
  {
    label: 'Poll',
    path: '/poll',
  },
  {
    label: 'Moderation',
    path: '/moderation',
  },
  {
    label: 'Ranking',
    path: '/ranking',
  },
  {
    label: 'User',
    path: '/user',
  },
];