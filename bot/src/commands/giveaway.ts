import { SlashCommandBuilder } from 'discord.js';
import { logger } from '../utils/logger';
import { giveawayService } from '../services/giveaway.service';

export const giveawayCommand = new SlashCommandBuilder()
  .setName('giveaway')
  .setDescription('Create a new giveaway.')
  .addStringOption((option) =>
    option
      .setName('prize')
      .setDescription('The prize for the giveaway.')
      .setRequired(true)
  )
  .addIntegerOption((option) =>
    option
      .setName('duration')
      .setDescription('The duration of the giveaway in minutes.')
      .setRequired(true)
  )
  .addIntegerOption((option) =>
    option
      .setName('winners')
      .setDescription('The number of winners for the giveaway.')
      .setRequired(true)
  );

export async function execute(interaction) {
  try {
    const prize = interaction.options.getString('prize');
    const duration = interaction.options.getInteger('duration');
    const winners = interaction.options.getInteger('winners');

    const giveaway = await giveawayService.createGiveaway(
      interaction.guildId,
      prize,
      duration,
      winners,
    );

    await interaction.reply(
      `Giveaway created successfully! Prize: ${giveaway.prize}, Duration: ${giveaway.duration} minutes, Winners: ${giveaway.winners}`,
    );
  } catch (error) {
    logger.error(`Error executing giveaway command: ${error}`);
    await interaction.reply(
      'An error occurred while executing the giveaway command.',
    );
  }
}