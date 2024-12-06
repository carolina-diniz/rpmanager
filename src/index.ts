import { discordApi } from "./connections/discord.api";

async function initializeBot() {
  try {
    await discordApi().then(() => console.log("Bot initialized"));
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
