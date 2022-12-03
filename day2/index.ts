import * as fs from "fs";
import readline from "readline";
import { Round } from "./round";

(async () => {
  const fileStream = fs.createReadStream("rps-input.txt");

  const lines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let originalScore = 0;
  let playerScore = 0;

  for await (const line of lines) {
    let moves = line.split(" ");
    let transformedMove = transformMove(moves[0], moves[1]);

    const originalRound = new Round(moves[0], moves[1]);
    const round = new Round(moves[0], transformedMove);

    playerScore += round.playerScore;
    originalScore += originalRound.playerScore;
  }

  console.log(`Score using move play strategy: ${originalScore}`);
  console.log(`Score using win/loss/draw strategy ${playerScore}`);
})();

function transformMove(opponentMove: string, playerMove: string): string {
  let transformedMove = "";
  if (playerMove === "X") {
    //lose
    if (opponentMove === "A") {
      transformedMove = "Z"; //paper
    } else if (opponentMove === "B") {
      transformedMove = "X"; //scissors
    } else if (opponentMove === "C") {
      transformedMove = "Y"; //roc
    }
  }

  if (playerMove === "Y") {
    //draw
    if (opponentMove === "A") {
      transformedMove = "X";
    }
    if (opponentMove === "B") {
      transformedMove = "Y";
    }
    if (opponentMove === "C") {
      transformedMove = "Z";
    }
  }

  if (playerMove === "Z") {
    //lose
    if (opponentMove === "A") {
      transformedMove = "Y";
    }
    if (opponentMove === "B") {
      transformedMove = "Z";
    }
    if (opponentMove === "C") {
      transformedMove = "X";
    }
  }

  return transformedMove;
}
