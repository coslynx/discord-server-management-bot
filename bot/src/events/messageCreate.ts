import { Client, Message } from 'discord.js';
import { logger } from '../utils/logger';
import { commandHandler } from '../utils/commandHandler';
import { musicService } from '../services/music.service';
import { giveawayService } from '../services/giveaway.service';
import { pollService } from '../services/poll.service';
import { moderationService } from '../services/moderation.service';
import { rankingService } from '../services/ranking.service';
import { userService } from '../services/user.service';

export default (client: Client) => {
  client.on('messageCreate', async (message: Message) => {
    if (message.author.bot) return;

    try {
      // Check if the message is a command
      if (message.content.startsWith('!')) {
        const args = message.content.slice(1).trim().split(/ +/);
        const commandName = args.shift()?.toLowerCase();

        if (commandName) {
          const command = commandHandler.getCommand(commandName);

          if (command) {
            await command.execute(message, args);
          } else {
            logger.warn(`Command '${commandName}' not found. Ignoring message.`);
          }
        }
      } else {
        // Handle non-command messages
        // Example: Check for specific keywords or patterns
        if (message.content.includes('hello')) {
          await message.reply('Hello there!');
        }

        // Additional logic based on project requirements
      }
    } catch (error) {
      logger.error(`Error handling message: ${error}`);
      await message.reply(
        'An error occurred while processing your message. Please try again later.',
      );
    }
  });
};