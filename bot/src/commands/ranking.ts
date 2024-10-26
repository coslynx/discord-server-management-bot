import { SlashCommandBuilder } from 'discord.js';
import { logger } from '../utils/logger';
import { rankingService } from '../services/ranking.service';

export const rankingCommand = new SlashCommandBuilder()
  .setName('ranking')
  .setDescription('Manage server rankings.')
  .addSubcommand((subcommand) =>
    subcommand
      .setName('leaderboard')
      .setDescription('View the server leaderboard.')
      .addIntegerOption((option) =>
        option
          .setName('limit')
          .setDescription('Number of users to display.')
          .setRequired(false)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('user')
      .setDescription('View a user\'s ranking.')
      .addUserOption((option) =>
        option
          .setName('user')
          .setDescription('The user to view the ranking of.')
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('update')
      .setDescription('Update a user\'s ranking.')
      .addUserOption((option) =>
        option
          .setName('user')
          .setDescription('The user to update the ranking of.')
          .setRequired(true)
      )
      .addIntegerOption((option) =>
        option
          .setName('points')
          .setDescription('Number of points to add or subtract.')
          .setRequired(true)
      )
  );

export async function execute(interaction) {
  try {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === 'leaderboard') {
      const limit = interaction.options.getInteger('limit') || 10;

      const leaderboard = await rankingService.getLeaderboard(
        interaction.guildId,
        limit,
      );

      if (leaderboard.length) {
        const leaderboardString = leaderboard
          .map(
            (user, index) =>
              `${index + 1}. ${user.userId} - ${user.points} points`,
          )
          .join('\n');

        await interaction.reply(`Leaderboard:\n${leaderboardString}`);
      } else {
        await interaction.reply('No users have any points yet.');
      }
    } else if (subcommand === 'user') {
      const user = interaction.options.getUser('user');

      const ranking = await rankingService.getUserRanking(
        interaction.guildId,
        user.id,
      );

      await interaction.reply(
        `User: ${user.tag}\nPoints: ${ranking.points}`,
      );
    } else if (subcommand === 'update') {
      const user = interaction.options.getUser('user');
      const points = interaction.options.getInteger('points');

      const updatedRanking = await rankingService.updateRanking(
        interaction.guildId,
        user.id,
        points,
      );

      await interaction.reply(
        `Updated ${user.tag}'s ranking! Points: ${updatedRanking.points}`,
      );
    }
  } catch (error) {
    logger.error(`Error executing ranking command: ${error}`);
    await interaction.reply(
      'An error occurred while executing the ranking command.',
    );
  }
}