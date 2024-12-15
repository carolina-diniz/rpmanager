import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("pedirset")
  .setDescription("Abre configurações de pedido de set.");

export async function execute(interaction: CommandInteraction) {
  try {
    await interaction.deferReply({ ephemeral: true });

    const embed = new EmbedBuilder()
      .setTitle("Configurações de pedido de set")
      .setDescription("Escolha uma das opções abaixo:"); 

    const createChannels = new ButtonBuilder()
      .setCustomId("pedirset_createChannels")
      .setEmoji('➕')
      .setLabel("Criar canais")
      .setStyle(ButtonStyle.Primary);

    const editChannels = new ButtonBuilder()
      .setCustomId("pedirset_editChannels")
      .setEmoji('✍️')
      .setLabel("Editar canais")
      .setStyle(ButtonStyle.Primary);

    const createRoles = new ButtonBuilder()
      .setCustomId("pedirset_createRoles")
      .setEmoji('🛂')
      .setLabel("Add Cargos")
      .setStyle(ButtonStyle.Primary);

    const editRoles = new ButtonBuilder()
      .setCustomId("pedirset_editRoles")
      .setEmoji('🛂')
      .setLabel("Edit Cargos")
      .setStyle(ButtonStyle.Primary);

    const close = new ButtonBuilder()
      .setCustomId("close")
      .setEmoji('❌')
      .setLabel("Fechar")
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      createChannels,
      editChannels,
      createRoles,
      editRoles,
      close
    );

    await interaction.editReply({embeds: [embed], components: [row] }); 
  } catch (error) {
    console.error(error);
  }
}

export default { data, execute };
