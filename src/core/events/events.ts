import { client } from "../../connections";
import { guildAvailable } from "./guildAvailable";
import { interactionCreate } from "./interaction-create";
import { ready } from "./ready";

export default () => {
  return {
    listen: () => {
      client
        .once("ready", ready)
        .on("guildAvailable", guildAvailable)
        .on("interactionCreate", interactionCreate);
    },
  };
};
