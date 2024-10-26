import { SlashCommandBuilder } from 'discord.js';
import { logger } from '../utils/logger';
import { pollService } from '../services/poll.service';

export const pollCommand = new SlashCommandBuilder()
  .setName('poll')
  .setDescription('Create a new poll.')
  .addStringOption((option) =>
    option
      .setName('question')
      .setDescription('The question for the poll.')
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName('options')
      .setDescription('The options for the poll, separated by commas.')
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName('duration')
      .setDescription('The duration of the poll (e.g., 1h, 2d).')
      .setRequired(false)
  );

export async function execute(interaction) {
  try {
    const question = interaction.options.getString('question');
    const optionsString = interaction.options.getString('options');
    const duration = interaction.options.getString('duration');

    const options = optionsString.split(',').map((option) => ({
      name: option.trim(),
      votes: 0,
    }));

    const poll = await pollService.createPoll(
      interaction.guildId,
      question,
      options,
      duration,
    );

    await interaction.reply(
      `Poll created successfully! Question: ${poll.question}\nOptions: ${poll.options.map((option) => option.name).join(', ')}`,
    );
  } catch (error) {
    logger.error(`Error executing poll command: ${error}`);
    await interaction.reply(
      'An error occurred while executing the poll command.',
    );
  }
}