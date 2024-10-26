import { SlashCommandBuilder } from 'discord.js';
import { logger } from '../utils/logger';
import { userService } from '../services/user.service';

export const userCommand = new SlashCommandBuilder()
  .setName('user')
  .setDescription('Manage user accounts.')
  .addSubcommand((subcommand) =>
    subcommand
      .setName('register')
      .setDescription('Register a new user account.')
      .addStringOption((option) =>
        option
          .setName('email')
          .setDescription('Your email address.')
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName('password')
          .setDescription('Your password.')
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('login')
      .setDescription('Log in to your user account.')
      .addStringOption((option) =>
        option
          .setName('email')
          .setDescription('Your email address.')
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName('password')
          .setDescription('Your password.')
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand.setName('profile').setDescription('View your user profile.')
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('update')
      .setDescription('Update your user profile.')
      .addStringOption((option) =>
        option
          .setName('email')
          .setDescription('Your new email address.')
          .setRequired(false)
      )
      .addStringOption((option) =>
        option
          .setName('password')
          .setDescription('Your new password.')
          .setRequired(false)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand.setName('delete').setDescription('Delete your user account.')
  );

export async function execute(interaction) {
  try {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === 'register') {
      const email = interaction.options.getString('email');
      const password = interaction.options.getString('password');

      const user = await userService.register(email, password);

      await interaction.reply(
        `User registered successfully! Your email is ${user.email}`,
      );
    } else if (subcommand === 'login') {
      const email = interaction.options.getString('email');
      const password = interaction.options.getString('password');

      const user = await userService.login(email, password);

      await interaction.reply(
        `Logged in successfully! Welcome, ${user.email}`,
      );
    } else if (subcommand === 'profile') {
      const user = await userService.getProfile(interaction.user.id);

      await interaction.reply(
        `Your profile:\nEmail: ${user.email}\nCreated at: ${user.createdAt}`,
      );
    } else if (subcommand === 'update') {
      const email = interaction.options.getString('email');
      const password = interaction.options.getString('password');

      const user = await userService.updateProfile(
        interaction.user.id,
        email,
        password,
      );

      await interaction.reply(
        `Profile updated successfully! Your new email is ${user.email}`,
      );
    } else if (subcommand === 'delete') {
      await userService.deleteProfile(interaction.user.id);

      await interaction.reply('User account deleted successfully.');
    }
  } catch (error) {
    logger.error(`Error executing user command: ${error}`);
    await interaction.reply(
      'An error occurred while executing the user command.',
    );
  }
}