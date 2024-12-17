import { ButtonInteraction, CommandInteraction, Interaction } from "discord.js";
import { buttons } from "../../buttons";
import { commands } from "../../commands";
import { submit } from "../../submit/submit";

export async function interactionCreate(interaction: Interaction) {
  console.log(`Interaction created: ${interaction.id}`);

  if (interaction.isCommand()) {
    const { commandName } = interaction;

    if (commandName in commands) {
      console.log(`Command: ${commandName} user: ${interaction.user.displayName}`);
      await commands[commandName as keyof typeof commands].execute(interaction as CommandInteraction);
    }
  }

  if (interaction.isButton()) {
    const { customId } = interaction;

    console.log(`Button: ${customId} user: ${interaction.user.displayName}`);

    if (customId in buttons) {
      await buttons[customId as keyof typeof buttons].execute(interaction as ButtonInteraction);
    }
  }

  if (interaction.isModalSubmit()) {
    const { customId } = interaction;

    console.log(`Modal Submit: ${customId} user: ${interaction.user.displayName}`);

    if (customId in submit) {
      await submit[customId as keyof typeof submit].execute(interaction);
    }
  }
}
