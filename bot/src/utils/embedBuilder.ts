import { MessageEmbed } from 'discord.js';
import { logger } from './logger';

export const embedBuilder = {
  /
    Builds a Discord embed with the specified title, description, and optional fields.
   
    @param title The title of the embed.
    @param description The description of the embed.
    @param fields An array of objects representing the fields of the embed.
    @param color The color of the embed.
    @param timestamp Whether to include a timestamp.
    @param footer The footer text.
    @param thumbnail The URL of the thumbnail image.
    @param image The URL of the image.
    @returns A new MessageEmbed object.
   /
  buildEmbed(
    title: string,
    description: string,
    fields?: { name: string; value: string; inline?: boolean }[],
    color?: string,
    timestamp?: boolean,
    footer?: string,
    thumbnail?: string,
    image?: string,
  ): MessageEmbed {
    try {
      const embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(description);

      if (fields) {
        fields.forEach((field) => {
          embed.addField(field.name, field.value, field.inline);
        });
      }

      if (color) {
        embed.setColor(color);
      }

      if (timestamp) {
        embed.setTimestamp();
      }

      if (footer) {
        embed.setFooter({ text: footer });
      }

      if (thumbnail) {
        embed.setThumbnail(thumbnail);
      }

      if (image) {
        embed.setImage(image);
      }

      return embed;
    } catch (error) {
      logger.error(`Error building embed: ${error}`);
      throw new Error('Failed to build embed');
    }
  },
};