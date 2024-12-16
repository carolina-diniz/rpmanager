import { ButtonInteraction, ChannelType, TextChannel } from "discord.js";
import { ModelGuild } from "../../../../../core/models";

export async function execute(interaction: ButtonInteraction) {
  try {
    const { customId, user, guildId } = interaction;
    const channel = await createChannel(interaction);

    if (!channel) {
      throw new Error("Channel not created");
    }

    const guildDb = await ModelGuild.findOne({ guildId });

    if (!guildDb) {
      throw new Error("Guild not found");
    }

    guildDb.channels.aprovarset.id = channel.id;
    guildDb.channels.aprovarset.name = channel.name;

    guildDb.save();
    console.log(`Channel created: ${channel.name}`);
  } catch (error) {
    console.error(error);
  }
}

async function createChannel(interaction: ButtonInteraction): Promise<TextChannel | undefined> {
  const channel = await interaction.guild?.channels.create({
    name: "aprovar-set",
    permissionOverwrites: [
      {
        id: interaction.guild!.roles.everyone.id,
        allow: ["ReadMessageHistory", "ManageMessages"],
        deny: [
          "ViewChannel",
          "SendMessages",
          "SendMessagesInThreads",
          "SendPolls",
          "SendTTSMessages",
          "SendVoiceMessages",
        ],
      },
    ],
    type: ChannelType.GuildText,
  });

  return channel;
}
