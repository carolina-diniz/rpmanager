import { Client, IntentsBitField } from "discord.js";
import { SHARED } from "../static/global";

export const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMembers,
  ],
});

export async function discordApi() {
  console.log('Initializing Discord API');
  return await client.login(SHARED.DS_TOKEN);
}
