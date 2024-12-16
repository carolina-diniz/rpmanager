import { ButtonInteraction } from "discord.js";

export async function execute(interaction: ButtonInteraction) {
  console.log(`Button: ${interaction.customId} user: ${interaction.user.displayName}`);
  await interaction.reply("Button clicked!");
}