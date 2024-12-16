import { ButtonInteraction, EmbedBuilder } from "discord.js";
import { componentsButtons } from "../../../modules/buttons";

export async function execute(interaction: ButtonInteraction) {
  try {
    console.log(`Button: ${interaction.customId} user: ${interaction.user.displayName}`);

    const footer = interaction.message.embeds[0].data.footer?.text;

    const embed = new EmbedBuilder(interaction.message.embeds[0].data);
    let window: any = {};

    switch (footer) {
      case "createChannels":
        window = componentsButtons.pedirset;
        break;
      case "pedirset":
        window = componentsButtons.pedirset;
        break;
      case "createRoles":
        window = componentsButtons.pedirset;
        break;
      default:
        window = componentsButtons.pedirset;
    }

    embed.setFooter(window.footer);
    await interaction.update({ embeds: [embed], components: [window.buttons] });
  } catch (error) {
    console.error(error);
  }
}
