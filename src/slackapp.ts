import { config } from "dotenv";
config();

import { App } from "@slack/bolt";
import { Board } from "./board/Board";
import { EnglishBoard } from "./board/EnglishBoard";
import { AsciiRenderer } from "./render/AsciiRenderer";
import {
  applyTurnList,
  turn,
  turnFromString,
  turnListFromString,
} from "./GameEngine";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const boards: { [channel: string]: Board } = {};

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
  const reply = handleUserInput(input, message.channel);

  await say(reply);
});

function handleUserInput(input: string, channel: string) {
  console.log("got input", input, "on channel", channel);

  boards[channel] ||= new EnglishBoard();

  if (input === "start") {
    boards[channel] = new EnglishBoard();
    return `Okay.  Let's start :+1:\nHere's the initial board: \`\`\`${new AsciiRenderer().render(
      boards[channel]
    )}\`\`\`\nNow try a turn like \`b4-d4\`.`;
  }

  try {
    const turnList = turnListFromString(input);

    try {
      boards[channel] = applyTurnList(boards[channel], turnList);
      return `\`\`\`${new AsciiRenderer().render(boards[channel])}\`\`\``;
    } catch (e) {
      console.warn("board update failed", e);
      return "I'm afraid this turn doesn't seem to be valid :scream:";
    }
  } catch (e) {
    /* probably the input wasn't a turn list, ... ignore :) */
  }

  if (input === "rerender") {
    return `\`\`\`${new AsciiRenderer().render(boards[channel])}\`\`\``;
  }

  if (input === "help") {
    return "Start a new game with `start`.  Then try turns like `b4-d4`.\nTo just reprint the game, try `rerender`.";
  }

  return "Sorry.  I didn't get that. Maybe try `help`.";
}

(async () => {
  await app.start(Number.parseInt(process.env.PORT || "3000", 10));
  console.log("⚡️ Slackitaire is running!");
})();
