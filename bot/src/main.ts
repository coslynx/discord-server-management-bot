import { Client, IntentsBitField } from 'discord.js';
import { token } from './config';
import { registerCommands } from './utils/commandHandler';
import { registerEvents } from './utils/eventHandler';
import { logger } from './utils/logger';

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildVoiceStates,
  ],
});

client.on('ready', async () => {
  if (!client.user) return;
  logger.info(`Logged in as ${client.user.tag}`);

  await registerCommands(client);
  registerEvents(client);
});

client.login(token).catch((error) => {
  logger.error(`Error while logging in: ${error}`);
});