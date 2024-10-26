import { SlashCommandBuilder } from 'discord.js';
import { logger } from '../utils/logger';
import { moderationService } from '../services/moderation.service';

export const moderationCommand = new SlashCommandBuilder()
  .setName('moderation')
  .setDescription('Manage server moderation.')
  .addSubcommand((subcommand) =>
    subcommand
      .setName('filter')
      .setDescription('Filter messages based on keywords or patterns.')
      .addStringOption((option) =>
        option
          .setName('keyword')
          .setDescription('The keyword or pattern to filter.')
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName('action')
          .setDescription('The action to take on matching messages.')
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName('reason')
          .setDescription('Reason for filtering messages.')
          .setRequired(false)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('mute')
      .setDescription('Mute a user.')
      .addUserOption((option) =>
        option
          .setName('user')
          .setDescription('The user to mute.')
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName('duration')
          .setDescription('Duration of the mute (e.g., 1h, 2d).')
          .setRequired(false)
      )
      .addStringOption((option) =>
        option
          .setName('reason')
          .setDescription('Reason for muting the user.')
          .setRequired(false)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('unmute')
      .setDescription('Unmute a user.')
      .addUserOption((option) =>
        option
          .setName('user')
          .setDescription('The user to unmute.')
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('kick')
      .setDescription('Kick a user from the server.')
      .addUserOption((option) =>
        option
          .setName('user')
          .setDescription('The user to kick.')
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName('reason')
          .setDescription('Reason for kicking the user.')
          .setRequired(false)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('ban')
      .setDescription('Ban a user from the server.')
      .addUserOption((option) =>
        option
          .setName('user')
          .setDescription('The user to ban.')
          .setRequired(true)
      )
      .addIntegerOption((option) =>
        option
          .setName('duration')
          .setDescription('Duration of the ban (in days).')
          .setRequired(false)
      )
      .addStringOption((option) =>
        option
          .setName('reason')
          .setDescription('Reason for banning the user.')
          .setRequired(false)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('warn')
      .setDescription('Issue a warning to a user.')
      .addUserOption((option) =>
        option
          .setName('user')
          .setDescription('The user to warn.')
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName('reason')
          .setDescription('Reason for warning the user.')
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('clear')
      .setDescription('Clear messages from a channel.')
      .addIntegerOption((option) =>
        option
          .setName('amount')
          .setDescription('Number of messages to clear.')
          .setRequired(true)
      )
  );

export async function execute(interaction) {
  try {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === 'filter') {
      const keyword = interaction.options.getString('keyword');
      const action = interaction.options.getString('action');
      const reason = interaction.options.getString('reason');

      await moderationService.filterMessages(
        interaction.guildId,
        keyword,
        action,
        reason,
      );

      await interaction.reply(
        `Message filtering enabled for keyword: ${keyword}. Action: ${action}.`,
      );
    } else if (subcommand === 'mute') {
      const user = interaction.options.getUser('user');
      const duration = interaction.options.getString('duration');
      const reason = interaction.options.getString('reason');

      await moderationService.muteUser(
        interaction.guildId,
        user.id,
        duration,
        reason,
      );

      await interaction.reply(
        `User ${user.tag} muted for ${duration || 'indefinite'}.`,
      );
    } else if (subcommand === 'unmute') {
      const user = interaction.options.getUser('user');

      await moderationService.unmuteUser(interaction.guildId, user.id);

      await interaction.reply(`User ${user.tag} unmuted.`);
    } else if (subcommand === 'kick') {
      const user = interaction.options.getUser('user');
      const reason = interaction.options.getString('reason');

      await moderationService.kickUser(interaction.guildId, user.id, reason);

      await interaction.reply(`User ${user.tag} kicked.`);
    } else if (subcommand === 'ban') {
      const user = interaction.options.getUser('user');
      const duration = interaction.options.getInteger('duration');
      const reason = interaction.options.getString('reason');

      await moderationService.banUser(
        interaction.guildId,
        user.id,
        duration,
        reason,
      );

      await interaction.reply(
        `User ${user.tag} banned for ${duration || 'indefinite'}.`,
      );
    } else if (subcommand === 'warn') {
      const user = interaction.options.getUser('user');
      const reason = interaction.options.getString('reason');

      await moderationService.warnUser(interaction.guildId, user.id, reason);

      await interaction.reply(`User ${user.tag} warned.`);
    } else if (subcommand === 'clear') {
      const amount = interaction.options.getInteger('amount');

      await interaction.channel?.bulkDelete(amount, true);

      await interaction.reply(`Cleared ${amount} messages.`);
    }
  } catch (error) {
    logger.error(`Error executing moderation command: ${error}`);
    await interaction.reply(
      'An error occurred while executing the moderation command.',
    );
  }
}