import * as readline from "readline";
import { stdin as input, stdout as output } from "process";
import { GameEngine } from "./GameEngine";

const rl = readline.createInterface({ input, output });
const engine = new GameEngine();

console.log("Game engine ready for take-off.  Let me know your commands.");

rl.on("line", (input) => {
  console.log(engine.handleUserInput(input, "cli").replace(/```/g, ""));
});
