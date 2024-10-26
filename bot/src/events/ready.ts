import { Client } from 'discord.js';
import { logger } from '../utils/logger';
import { registerCommands } from '../utils/commandHandler';
import { registerEvents } from '../utils/eventHandler';
import { token } from '../config';

export default (client: Client) => {
  client.on('ready', async () => {
    if (!client.user) return;
    logger.info(`Logged in as ${client.user.tag}`);

    await registerCommands(client);
    registerEvents(client);
  });
};