import { Client, IntentsBitField } from "discord.js";
import "dotenv/config";

export const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMembers,
  ],
});

export default async () => {
  return await client.login(process.env.DISCORD_TOKEN);
};
