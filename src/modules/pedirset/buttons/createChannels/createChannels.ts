import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";

export async function execute(interaction: ButtonInteraction) {
  try {
    console.log(`Button: ${interaction.customId} user: ${interaction.user.displayName}`);

    const createPedirset = new ButtonBuilder()
      .setCustomId("pedirset_createPedirset")
      .setLabel("Criar Pedirset")
      .setStyle(ButtonStyle.Primary);
    
    const createAprovarset = new ButtonBuilder()
      .setCustomId("pedirset_createAprovarset")
      .setLabel("Criar Aprovarset")
      .setStyle(ButtonStyle.Primary);
    
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      createPedirset,
      createAprovarset,
    )

    await interaction.update({ components: [row] });
  } catch (error) {
    console.error(error);   
  }
}