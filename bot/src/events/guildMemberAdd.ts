import { GuildMember, Client } from 'discord.js';
import { logger } from '../utils/logger';

export default (client: Client) => {
  client.on('guildMemberAdd', async (member: GuildMember) => {
    try {
      // Logic to handle new member joining the server
      // Example: Send a welcome message in the server's general channel
      const generalChannel = member.guild.channels.cache.find(
        (channel) => channel.name === 'general',
      );
      if (generalChannel) {
        await generalChannel.send(
          `Welcome, ${member.user.tag}! We're glad you're here.`,
        );
      }

      // Additional logic based on project requirements
    } catch (error) {
      logger.error(`Error handling guildMemberAdd event: ${error}`);
    }
  });
};