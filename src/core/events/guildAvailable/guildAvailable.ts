import { Guild } from "discord.js";
import { client } from "../../../connections";
import { remoteConfig } from "../../../remoteConfig";
import { deployCommands } from "../../services";

export async function guildAvailable(guild: Guild) {
  const { id, name } = guild;
  console.log(`Guild available: ${name} (${id})`);

  if (remoteConfig.autoDeployCommands) {
    await deployCommands(client.user!.id, { id, name });
  }
}
