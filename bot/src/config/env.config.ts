import  as dotenv from 'dotenv';

dotenv.config();

export const envConfig = {
  discordToken: process.env.DISCORD_TOKEN,
  mongoUri: process.env.MONGO_URI,
  youtubeApiKey: process.env.YOUTUBE_API_KEY,
  spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
  spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  soundcloudClientId: process.env.SOUNDCLOUD_CLIENT_ID,
  soundcloudClientSecret: process.env.SOUNDCLOUD_CLIENT_SECRET,
  geniusAccessToken: process.env.GENIUS_ACCESS_TOKEN,
  openaiApiKey: process.env.OPENAI_API_KEY,
  googleCloudVisionApiKey: process.env.GOOGLE_CLOUD_VISION_API_KEY,
};