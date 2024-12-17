import {
  ActionRowBuilder,
  ButtonInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

export async function execute(interaction: ButtonInteraction) {
  try {
    const modal = new ModalBuilder()
      .setCustomId("pedirset_start")
      .setTitle(`PEDIR SET - ${interaction.guild?.name.toUpperCase()}`);

    const name = new TextInputBuilder()
      .setCustomId("pedirset_input_name")
      .setLabel("Nome Completo")
      .setPlaceholder("Digite seu nome do jogo")
      .setStyle(TextInputStyle.Short)
      .setRequired(true)
      .setMinLength(2)
      .setMaxLength(20);

    const id = new TextInputBuilder()
      .setCustomId("pedirset_input_id")
      .setLabel("ID do Jogo")
      .setRequired(true)
      .setPlaceholder("Digite seu ID do jogo (F11)")
      .setMinLength(1)
      .setMaxLength(7)
      .setStyle(TextInputStyle.Short);

    const phone = new TextInputBuilder()
      .setCustomId("pedirset_input_phone")
      .setLabel("Celular do Jogo")
      .setRequired(true)
      .setPlaceholder("Digite seu número de celular do jogo")
      .setMinLength(6)
      .setMaxLength(7)
      .setStyle(TextInputStyle.Short);

    const recruiter = new TextInputBuilder()
      .setCustomId("pedirset_input_recruiter")
      .setLabel("ID do Recrutador")
      .setRequired(true)
      .setPlaceholder("Digite o ID de quem está te recrutando")
      .setMinLength(1)
      .setMaxLength(20)
      .setStyle(TextInputStyle.Short);

    const row1 = new ActionRowBuilder<TextInputBuilder>().addComponents(name);
    const row2 = new ActionRowBuilder<TextInputBuilder>().addComponents(id);
    const row3 = new ActionRowBuilder<TextInputBuilder>().addComponents(phone);
    const row4 = new ActionRowBuilder<TextInputBuilder>().addComponents(recruiter);

    modal.addComponents(row1, row2, row3, row4);
    await interaction.showModal(modal);
  } catch (error) {
    console.error(error);
  }
}
