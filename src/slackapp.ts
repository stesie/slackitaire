import { config } from "dotenv";
config();

import { App } from "@slack/bolt";
import { GameEngine } from "./GameEngine";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const engine = new GameEngine();

app.message(async ({ message, say }) => {
  if (message.subtype !== undefined) {
    console.debug("ignoring message w/ subtype", message.subtype);
    return;
  }

  if (!message.text) {
    return;
  }

  if (
    message.channel_type === "channel" &&
    !message.text.includes("<@U02NGJNHQCW>")
  ) {
    console.debug("ignoring message not directed at me", message.text);
    return;
  }

  const input = message.text.replace("<@U02NGJNHQCW>", "").trim();
  const reply = engine.handleUserInput(input, message.channel);

  await say(reply);
});

(async () => {
  await app.start(Number.parseInt(process.env.PORT || "3000", 10));
  console.log("⚡️ Slackitaire is running!");
})();
