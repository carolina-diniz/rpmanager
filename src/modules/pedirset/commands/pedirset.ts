import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { componentsButtons } from "../../buttons";

export const data = new SlashCommandBuilder()
  .setName("pedirset")
  .setDescription("Abre configurações de pedido de set.");

export async function execute(interaction: CommandInteraction) {
  try {
    await interaction.deferReply();
    const { buttons, footer } = componentsButtons.pedirset;

    const embed = new EmbedBuilder()
      .setTitle("Configurações de pedido de set")
      .setDescription("Escolha uma das opções abaixo:")
      .setFooter(footer);

    await interaction.editReply({ embeds: [embed], components: [buttons] });
  } catch (error) {
    console.error(error);
  }
}

export default { data, execute };
