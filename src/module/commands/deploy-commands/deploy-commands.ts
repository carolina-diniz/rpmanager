import { REST, Routes } from "discord.js";
import { SHARED } from "../../../shared";
import { commands } from "../commands";

export async function deployCommands(clientId: string, guild: { id: string, name: string}) {
  try {
    const rest: REST = new REST({version: '10'}).setToken(SHARED.DS_TOKEN)
    const commandsData = Object.values(commands).map(command => command.data)
    let data: any = await rest.put(Routes.applicationGuildCommands(clientId, guild.id), {
      body: commandsData
    })

    console.log(`${data.length} commands successfully deployed to ${guild.name}`)
  } catch (error) {
    console.error('Error deploying commands:', error);    
  }
}