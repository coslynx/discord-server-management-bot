import { Client, CommandInteraction, Message } from 'discord.js';
import { logger } from './logger';
import { musicCommand, execute as musicExecute } from '../commands/music';
import { giveawayCommand, execute as giveawayExecute } from '../commands/giveaway';
import { pollCommand, execute as pollExecute } from '../commands/poll';
import { moderationCommand, execute as moderationExecute } from '../commands/moderation';
import { rankingCommand, execute as rankingExecute } from '../commands/ranking';
import { userCommand, execute as userExecute } from '../commands/user';
import { helpCommand, execute as helpExecute } from '../commands/help';

export const commandHandler = {
  commands: [
    musicCommand,
    giveawayCommand,
    pollCommand,
    moderationCommand,
    rankingCommand,
    userCommand,
    helpCommand,
  ],

  getCommand(commandName: string): SlashCommandBuilder | undefined {
    return this.commands.find((command) => command.name === commandName);
  },

  getAllCommands(): SlashCommandBuilder[] {
    return this.commands;
  },

  registerCommands(client: Client): Promise<void> {
    return client.application?.commands.set(this.commands.map((command) => command.toJSON()));
  },

  async execute(interaction: CommandInteraction): Promise<void> {
    try {
      const commandName = interaction.commandName;
      const command = this.getCommand(commandName);

      if (command) {
        if (commandName === 'music') {
          await musicExecute(interaction);
        } else if (commandName === 'giveaway') {
          await giveawayExecute(interaction);
        } else if (commandName === 'poll') {
          await pollExecute(interaction);
        } else if (commandName === 'moderation') {
          await moderationExecute(interaction);
        } else if (commandName === 'ranking') {
          await rankingExecute(interaction);
        } else if (commandName === 'user') {
          await userExecute(interaction);
        } else if (commandName === 'help') {
          await helpExecute(interaction);
        }
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
  },

  async handleMessage(message: Message): Promise<void> {
    try {
      if (message.author.bot) return;
      if (message.content.startsWith('!')) {
        const args = message.content.slice(1).trim().split(/ +/);
        const commandName = args.shift()?.toLowerCase();
        if (commandName) {
          const command = this.getCommand(commandName);
          if (command) {
            await command.execute(message, args);
          } else {
            logger.warn(
              `Command '${commandName}' not found. Ignoring message.`,
            );
          }
        }
      }
    } catch (error) {
      logger.error(`Error handling message: ${error}`);
      await message.reply(
        'An error occurred while processing your message. Please try again later.',
      );
    }
  },
};