import { Client } from "discord.js";

export function ready(client: Client<true>) {
  console.log(`Logged in as ${client.user?.tag}`);
}