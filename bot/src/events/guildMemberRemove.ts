import { GuildMember, Client } from 'discord.js';
import { logger } from '../utils/logger';

export default (client: Client) => {
  client.on('guildMemberRemove', async (member: GuildMember) => {
    try {
      // Logic to handle member leaving the server
      // Example: Send a farewell message in the server's general channel
      const generalChannel = member.guild.channels.cache.find(
        (channel) => channel.name === 'general',
      );
      if (generalChannel) {
        await generalChannel.send(
          `Farewell, ${member.user.tag}! We hope you enjoyed your time here.`,
        );
      }

      // Additional logic based on project requirements
    } catch (error) {
      logger.error(`Error handling guildMemberRemove event: ${error}`);
    }
  });
};