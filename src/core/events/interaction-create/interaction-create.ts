import { Interaction } from "discord.js";
import { commands } from "../../commands";

export async function interactionCreate(interaction: Interaction) {
  console.log(`Interaction created: ${interaction.id}`);

  if (interaction.isCommand()) {
    const { commandName } = interaction;

    if (commandName in commands) {
      console.log(`Command: ${commandName} user: ${interaction.user.displayName}`);
      await commands[commandName as keyof typeof commands].execute(interaction);
    }
  }
}
