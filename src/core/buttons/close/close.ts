import { ButtonInteraction } from "discord.js";

export async function execute(interaction: ButtonInteraction) {
  try {
    await interaction.message.delete();
  } catch (error) {
    console.error(error);
  }

}