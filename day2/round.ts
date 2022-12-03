import { RpsMoves, ShapeType } from "./shape-enum";

export class Round {
  opponentMove: RpsMoves = RpsMoves.scissors;
  playerMove: RpsMoves = RpsMoves.scissors;

  constructor(opponentMove: string, playerMove: string) {
    const opponentShape = this.getValueByKey(opponentMove);
    const playerShape = this.getValueByKey(playerMove);

    if (opponentShape && playerShape) {
      this.opponentMove = RpsMoves[opponentShape];
      this.playerMove = RpsMoves[playerShape];
    }
  }

  getValueByKey(value: string) {
    return Object.entries(ShapeType).find(([key, val]) => key === value)?.[1];
  }

  get playerScore() {
    //1 for rock
    ////2 for paper
    //3 for scissors
    //0 for loss
    //3 for draw
    //6 for win
    let score = 0;

    if (this.playerMove === RpsMoves.rock) {
      score += 1;
    } else if (this.playerMove === RpsMoves.paper) {
      score += 2;
    } else if (this.playerMove === RpsMoves.scissors) {
      score += 3;
    }

    if (this.win(this.playerMove, this.opponentMove)) {
      score += 6;
    } else if (this.draw(this.playerMove, this.opponentMove)) {
      score += 3;
    }

    return score;
  }

  win(playerMove: RpsMoves, opponentMove: RpsMoves): boolean {
    if (
      this.playerMove === RpsMoves.rock &&
      this.opponentMove === RpsMoves.scissors
    ) {
      return true;
    }

    if (
      this.playerMove === RpsMoves.paper &&
      this.opponentMove === RpsMoves.rock
    ) {
      return true;
    }

    if (
      this.playerMove === RpsMoves.scissors &&
      this.opponentMove === RpsMoves.paper
    ) {
      return true;
    }

    return false;
  }

  draw(playerMove: RpsMoves, opponentMove: RpsMoves): boolean {
    return this.playerMove === this.opponentMove;
  }
}
