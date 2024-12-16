import { ButtonInteraction, EmbedBuilder } from "discord.js";
import { componentsButtons } from "../../../buttons";

export async function execute(interaction: ButtonInteraction) {
  try {
    console.log(`Button: ${interaction.customId} user: ${interaction.user.displayName}`);

    const { buttons, footer } = componentsButtons.createRoles;

    const embed = new EmbedBuilder(interaction.message.embeds[0].data).setFooter(footer);

    await interaction.update({ embeds: [embed], components: [buttons] });
  } catch (error) {
    console.error(error);
  }
}
