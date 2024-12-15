import discord from "./connections/discord";
import events from "./core/events/events";


async function initialize() {
  await discord();
  events().listen();
}

initialize();

process.on("SIGINT", function () {
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.warn("uncaughtException: ", error);
});

process.on("unhandledRejection", (reason, promise) => {
  console.warn({ unhandledRejection: { reason, promise } });
});
