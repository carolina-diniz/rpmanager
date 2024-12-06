import { Guild } from "discord.js";
import { client } from "../../connections";
import { deployCommands } from "../../module/commands";

export async function guildAvailable(guild: Guild): Promise<void> {
  await deployCommands(client.user!.id, { id: guild.id, name: guild.name})
}