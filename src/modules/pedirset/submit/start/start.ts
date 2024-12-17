import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  ModalSubmitInteraction
} from "discord.js";
import { ModelGuild } from "../../../../core/models";

export async function execute(interaction: ModalSubmitInteraction) {
  try {
    const nameInput = interaction.fields.getTextInputValue("pedirset_input_name");
    const idInput = interaction.fields.getTextInputValue("pedirset_input_id");
    const phomeInput = interaction.fields.getTextInputValue("pedirset_input_phone");
    const recruiterId = interaction.fields.getTextInputValue("pedirset_input_recruiter");

    const embed = new EmbedBuilder()
      .setTitle("AGUARDANDO APROVAÇÃO")
      .setThumbnail(await interaction.user.displayAvatarURL())
      .setTimestamp(Date.now())
      .setFields([
        { name: "Nome", value: nameInput, inline: false },
        { name: "ID", value: idInput, inline: false },
        { name: "Telefone", value: phomeInput, inline: false },
        { name: "Recrutador", value: recruiterId, inline: false },
      ]);

    const aprovar: ButtonBuilder = new ButtonBuilder()
      .setCustomId("aprovar")
      .setLabel("Aprovar")
      .setEmoji({ name: "✅" })
      .setStyle(ButtonStyle.Success);

    const reprovar: ButtonBuilder = new ButtonBuilder()
      .setCustomId("reprovar")
      .setLabel("Reprovar")
      .setEmoji({ name: "✖️" })
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(aprovar, reprovar);

    const guildDb = await ModelGuild.findOne({ guildId: interaction.guild?.id });

    const channel = await interaction.guild?.channels.resolve(guildDb?.channels.aprovarset.id!);

    if (!channel || !channel.isTextBased()) {
      throw new Error("Channel is not text based or does not exist");
    }

    await channel
      .send({
        content: `||<@${interaction.user.id}>||`,
        embeds: [embed],
        components: [row],
      })
      .then(async () => {
        await sendReplyMessage(interaction);
      });
  } catch (error) {
    console.error(error);
  }
}

async function sendReplyMessage(interaction: ModalSubmitInteraction) {
  const timeout: number = 30000;

  const embed = new EmbedBuilder().setTitle("Sua solicitação foi enviada com sucesso!")
    .setDescription(`Por favor, aguarde um momento!\n
    Seu pedido será avaliado por um moderador e seu acesso será liberado em breve.\n\n
    Mensagem deletada <t:${Math.floor((Date.now() + timeout) / 1000)}:R>.`);

  interaction.reply({ embeds: [embed!], ephemeral: true }).then((msg) => {
    setTimeout(() => {
      msg.delete();
    }, timeout);
  });
}
