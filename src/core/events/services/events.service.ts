import { client } from "../../../connections";
import { guildAvailable } from "../guild-available";
import { interactionCreate } from "../interaction-create";
import { ready } from "../ready";

export const EventService = {
  listen: () => {
    client
      .once("ready", ready)
      .on("interactionCreate", interactionCreate)
      .on('guildAvailable', guildAvailable);
  },
};
