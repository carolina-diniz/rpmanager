import { Guild } from "discord.js";
import { client } from "../../../connections";
import { remoteConfig } from "../../../remoteConfig";
import { ModelGuild } from "../../models";
import { deployCommands } from "../../services";

export async function guildAvailable(guild: Guild) {
  try {
    const { id, name } = guild;
    console.log(`Guild available: ${name} (${id})`);

    if (remoteConfig.autoDeployCommands) {
      await deployCommands(client.user!.id, { id, name });
    }

    const guildDb = await ModelGuild.findOne({ guilId: id });

    if (!guildDb) {
      const guildDb = new ModelGuild({
        guildId: id,
        name,
        memberCount: guild.memberCount,
        color: "#000000",
        prefix: "[N]",
        invites: [{ code: null, expires: null }],
        channels: {
          pedirset: {
            id: null,
            name: null,
          },
          aprovarset: {
            id: null,
            name: null,
          },
          pd: {
            id: null,
            name: null,
          },
        },
        roles: {
          entry: {
            id: null,
            name: null,
          },
          aprover: {
            id: null,
            name: null,
          },
        },
      });

      guildDb.save();
      console.log(`Guild ${name} (${id}) saved in database`);
    }
  } catch (error) {
    console.log(`Error on guildAvailable event: ${error}`);
  }
}
