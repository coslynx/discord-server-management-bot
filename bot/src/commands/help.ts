import { SlashCommandBuilder } from 'discord.js';
import { logger } from '../utils/logger';
import { commandHandler } from '../utils/commandHandler';

export const helpCommand = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Get help on available commands.')
  .addStringOption((option) =>
    option.setName('command')
      .setDescription('The command you need help with.')
      .setRequired(false)
  );

export async function execute(interaction) {
  try {
    const commandName = interaction.options.getString('command');

    if (commandName) {
      const command = commandHandler.getCommand(commandName);

      if (command) {
        await interaction.reply(
          `Command: ${command.name}\nDescription: ${command.description}`,
        );
      } else {
        await interaction.reply(
          `No command found with the name '${commandName}'`,
        );
      }
    } else {
      const commandList = commandHandler.getAllCommands();

      if (commandList.length) {
        await interaction.reply(`Available Commands:\n${commandList.map((command) => `- /${command.name}: ${command.description}`).join('\n')}`);
      } else {
        await interaction.reply('No commands are currently registered.');
      }
    }
  } catch (error) {
    logger.error(`Error executing help command: ${error}`);
    await interaction.reply(
      'An error occurred while executing the help command.',
    );
  }
}