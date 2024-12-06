import { discordApi } from "./connections/discord.api";
import { EventService } from "./core";

async function initializeBot() {
  try {
    await discordApi().then(() => console.log("Bot initialized"));
    EventService.listen()
  } catch (error) {
    console.error(error);
  }
}

initializeBot();

process.on("SIGINT", function () {
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.log(error);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log(reason);
  console.log(promise);
});
