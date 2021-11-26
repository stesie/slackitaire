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
  const msg = message.subtype === "message_changed" ? message.message : message;

  if (msg.subtype !== undefined) {
    console.debug("ignoring message w/ subtype", msg.subtype);
    return;
  }

  if (!msg.text) {
    return;
  }

  if (
    message.channel_type === "channel" &&
    !msg.text.includes("<@U02NGJNHQCW>")
  ) {
    console.debug("ignoring message not directed at me", msg.text);
    return;
  }

  if (message.subtype === "message_changed") {
    await say("ignoring requests trying to rewrite history :smirk:");
    return;
  }

  const input = msg.text.replace("<@U02NGJNHQCW>", "").trim().toLowerCase();
  const reply = engine.handleUserInput(input, msg.channel);

  await say(reply);
});

(async () => {
  await app.start(Number.parseInt(process.env.PORT || "3000", 10));
  console.log("⚡️ Slackitaire is running!");
})();
