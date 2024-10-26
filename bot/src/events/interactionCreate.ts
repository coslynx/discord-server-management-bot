import { Client, Interaction } from 'discord.js';
import { logger } from '../utils/logger';
import { commandHandler } from '../utils/commandHandler';
import { musicService } from '../services/music.service';
import { giveawayService } from '../services/giveaway.service';
import { pollService } from '../services/poll.service';
import { moderationService } from '../services/moderation.service';
import { rankingService } from '../services/ranking.service';
import { userService } from '../services/user.service';

export default (client: Client) => {
  client.on('interactionCreate', async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    try {
      const command = commandHandler.getCommand(interaction.commandName);

      if (command) {
        await command.execute(interaction);
      } else {
        logger.warn(
          `Command '${interaction.commandName}' not found. Ignoring interaction.`,
        );
      }
    } catch (error) {
      logger.error(`Error handling interaction: ${error}`);
      await interaction.reply({
        content:
          'An error occurred while executing the command. Please try again later.',
        ephemeral: true,
      });
    }
  });
};