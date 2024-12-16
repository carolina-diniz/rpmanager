import { ButtonInteraction, ChannelType } from "discord.js";
import { ModelGuild } from "../../../../../core/models";

export async function execute(interaction: ButtonInteraction) {
  try {
    const { guildId } = interaction;
    const channel = await createChannel(interaction);

    if (!channel) {
      throw new Error("Channel not created");
    }

    const guildDb = await ModelGuild.findOne({ guildId })

    if (!guildDb) {
      throw new Error("Guild not found");
    }

    guildDb.channels.pedirset.id = channel.id;
    guildDb.channels.pedirset.name = channel.name;
    
    guildDb.save();
    console.log(`Channel created: ${channel.name}`);
    
  } catch (error) {
    console.error(error);
  }
}

async function createChannel(interaction: ButtonInteraction) {
  const channel = await interaction.guild?.channels.create({
    name: "pedir-set",
    permissionOverwrites: [
      {
        id: interaction.guild!.roles.everyone.id,
        allow: ["ViewChannel", "ReadMessageHistory"],
        deny: [
          "SendMessages",
          "SendMessagesInThreads",
          "SendPolls",
          "SendTTSMessages",
          "SendVoiceMessages",
          "ManageMessages",
          "AddReactions",
        ],
      },
    ],
    type: ChannelType.GuildText,
  });

  return channel;
}
