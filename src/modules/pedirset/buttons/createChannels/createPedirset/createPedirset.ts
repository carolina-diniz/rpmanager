import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ChannelType,
  EmbedBuilder,
  TextChannel,
} from "discord.js";
import { ModelGuild } from "../../../../../core/models";

export async function execute(interaction: ButtonInteraction) {
  try {
    await interaction.deferReply({ ephemeral: true });

    const { guild } = interaction;
    const channel = await createChannel(interaction);

    if (!channel) {
      throw new Error("Channel not created");
    }

    await saveChannelInfos(channel, guild!.id);
    await createPedirsetMessage(channel, guild!.name);

    await interaction.editReply({ content: "Canal criado com sucesso!" });
  } catch (error) {
    console.error(error);
  }
}

async function saveChannelInfos(channel: TextChannel, guildId: string | null) {
  const guildDb = await ModelGuild.findOne({ guildId });

  if (!guildDb) {
    throw new Error("Guild not found");
  }

  guildDb.channels.pedirset.id = channel.id;
  guildDb.channels.pedirset.name = channel.name;

  guildDb.save();
  console.log(`Channel created: ${channel.name}`);
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

async function createPedirsetMessage(channel: TextChannel, guildName: string): Promise<void> {
  const embedMessage = new EmbedBuilder()
    .setTitle(`PEDIR SET ~ ${guildName.toUpperCase()}`)
    .setDescription(
      `Sistema para pedir set do ${guildName}!\n` +
        `Preencha com suas informações do jogo e não compartilhe informações pessoais.\n\n` +
        `Clique no botão \` Iniciar \` para pedir seu set.`
    );

  const start = new ButtonBuilder()
    .setCustomId("pedirset_start")
    .setLabel("Iniciar")
    .setStyle(ButtonStyle.Success)
    .setEmoji({ name: "✅" });

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(start);

  if (channel && channel.isTextBased()) {
    await channel.send({ embeds: [embedMessage], components: [row] });
  }
}
