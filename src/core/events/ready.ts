import { Client } from "discord.js";

export async function ready(client: Client<true>): Promise<void> {
  console.log('The bot is ready!');
}