import { SlashCommandBuilder } from 'discord.js';
import { logger } from '../utils/logger';
import { musicService } from '../services/music.service';

export const musicCommand = new SlashCommandBuilder()
  .setName('music')
  .setDescription('Play music in a voice channel.')
  .addSubcommand((subcommand) =>
    subcommand
      .setName('play')
      .setDescription('Plays a song from YouTube, Spotify, or SoundCloud.')
      .addStringOption((option) =>
        option
          .setName('query')
          .setDescription('The song or playlist to play.')
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand.setName('pause').setDescription('Pauses the current song.')
  )
  .addSubcommand((subcommand) =>
    subcommand.setName('resume').setDescription('Resumes the paused song.')
  )
  .addSubcommand((subcommand) =>
    subcommand.setName('stop').setDescription('Stops the music playback.')
  )
  .addSubcommand((subcommand) =>
    subcommand.setName('skip').setDescription('Skips the current song.')
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('queue')
      .setDescription('Adds a song to the queue.')
      .addStringOption((option) =>
        option
          .setName('query')
          .setDescription('The song or playlist to add to the queue.')
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand.setName('volume').setDescription('Sets the volume of the music.')
  );

export async function execute(interaction) {
  try {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === 'play') {
      const query = interaction.options.getString('query');

      await musicService.playMusic(interaction, query);
    } else if (subcommand === 'pause') {
      await musicService.pauseMusic(interaction);
    } else if (subcommand === 'resume') {
      await musicService.resumeMusic(interaction);
    } else if (subcommand === 'stop') {
      await musicService.stopMusic(interaction);
    } else if (subcommand === 'skip') {
      await musicService.skipMusic(interaction);
    } else if (subcommand === 'queue') {
      const query = interaction.options.getString('query');

      await musicService.queueMusic(interaction, query);
    } else if (subcommand === 'volume') {
      await musicService.setVolume(interaction);
    }
  } catch (error) {
    logger.error(`Error executing music command: ${error}`);
    await interaction.reply(
      'An error occurred while executing the music command.',
    );
  }
}