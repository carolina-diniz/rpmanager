import { ButtonInteraction, ChannelType, TextChannel } from "discord.js";
import { ModelGuild } from "../../../../../core/models";

export async function execute(interaction: ButtonInteraction) {
  try {
    await interaction.deferReply({ ephemeral: true });

    const { guildId } = interaction;
    const channel = await createChannel(interaction);

    if (!channel) {
      throw new Error("Channel not created");
    }

    await saveChannelInfos(channel, guildId);

    await interaction.editReply({ content: "Canal criado com sucesso!" });
  } catch (error) {
    console.error(error);
  }
}

async function saveChannelInfos(channel: TextChannel, guildId: string | null) {
  const { id, name } = channel;
  const guildDb = await ModelGuild.findOne({ guildId });

  if (!guildDb) {
    throw new Error("Guild not found");
  }

  guildDb.channels.aprovarset.id = id;
  guildDb.channels.aprovarset.name = name;

  guildDb.save();
  console.log(`Channel created: ${name}`);
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
