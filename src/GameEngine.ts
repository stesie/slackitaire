import { Board } from "./board/Board";
import { EnglishBoard } from "./board/EnglishBoard";
import { countPegs } from "./countPegs";
import { AsciiRenderer } from "./render/AsciiRenderer";
import { applyTurnList, turnListFromString } from "./rules";

export class GameEngine {
  boards: { [channel: string]: Board } = {};

  handleUserInput(input: string, channel: string) {
    console.log("got input", input, "on channel", channel);

    this.boards[channel] ||= new EnglishBoard();

    if (input === "start") {
      this.boards[channel] = new EnglishBoard();
      return `Okay.  Let's start :+1:
Pegs are indicated by \`·\`, empty holes by \`o\`.  For rules see: https://en.wikipedia.org/wiki/Peg_solitaire
Here's the initial board: \`\`\`\n${new AsciiRenderer().render(
        this.boards[channel]
      )}\`\`\`\nNow try a turn like \`b4-d4\`.`;
    }

    try {
      const turnList = turnListFromString(input);

      try {
        this.boards[channel] = applyTurnList(this.boards[channel], turnList);

        if (countPegs(this.boards[channel]) === 1) {
          return "Yay!  You've one (peg left), errr, won! :tada: :partyparrot:";
        }

        return `\`\`\`${new AsciiRenderer().render(
          this.boards[channel]
        )}\`\`\``;
      } catch (e) {
        if (!(e instanceof Error)) {
          throw e;
        }
        return `I'm afraid this turn doesn't seem to be valid :scream:\nThe rule engine chuntered like _${e.message}_`;
      }
    } catch (e) {
      /* probably the input wasn't a turn list, ... ignore :) */
    }

    if (input === "rerender") {
      return `\`\`\`${new AsciiRenderer().render(this.boards[channel])}\`\`\``;
    }

    if (input === "help") {
      return "Start a new game with `start`.  Then try turns like `b4-d4`.\nTo just reprint the game, try `rerender`.";
    }

    return "Sorry.  I didn't get that. Maybe try `help`.";
  }
}
