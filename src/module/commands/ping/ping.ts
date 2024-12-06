import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { commandsService } from "../service/commands.service";

const commandName = commandsService.getCommandFileName(__filename)

export const data = new SlashCommandBuilder()
.setName(commandName)
.setDescription(commandName)

export async function execute(interaction: CommandInteraction) {
  await interaction.reply({ content: 'pong!'})
}