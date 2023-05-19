import blackPawn from "../assets//bp.png";
import whitePawn from "../assets/wp.png";

import { black, white } from "../utils/constants";

const names = ["r1", "n1", "b1", "q", "k", "b2", "n2", "r2"];
const types = [
  "rock",
  "knight",
  "bishop",
  "queen",
  "king",
  "bishop",
  "knight",
  "rock",
];

export const initBoard = (firstPlayer) => {
  const p = [];
  const secondPlayer = firstPlayer == "black" ? "white" : "black";
  const secondPlayerPieces = firstPlayer == "black" ? white : black;

  const firstPlayerPieces = firstPlayer == "black" ? black : white;
  const firstPlayerNotatin = firstPlayer == "black" ? "b" : "w";
  const secondPlayerNotatin = firstPlayer == "black" ? "b" : "w";

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const key = `${row}` + "*" + `${col}`;

      if (row == 0) {
        p.push({
          name: secondPlayerNotatin + names[col],
          pos: key,
          player: secondPlayer,
          isDeleted: false,
          type: types[col],
          img: secondPlayerPieces[col].img,
        });
      } else if (row == 1) {
        p.push({
          name: secondPlayerNotatin + "p" + col,
          pos: key,
          player: secondPlayer,
          isDeleted: false,
          type: "pawn",
          img: secondPlayer == "black" ? blackPawn : whitePawn,
        });
      } else if (row == 6) {
        p.push({
          name: firstPlayerNotatin + "p" + col,
          pos: key,
          player: firstPlayer,
          isDeleted: false,
          type: "pawn",
          img: firstPlayer == "black" ? blackPawn : whitePawn,
          isFirstPlayer: true,
        });
      } else if (row == 7) {
        p.push({
          name: firstPlayerNotatin + names[col],
          pos: key,
          player: firstPlayer,
          isDeleted: false,
          type: types[col],
          img: firstPlayerPieces[col].img,
          isFirstPlayer: true,
        });
      }
    }
  }
  return p;
};
export const getRowAndCol = (piece) => {
  const row = Number(piece.pos.split("*")[0]);
  const col = Number(piece.pos.split("*")[1]);
  return [row, col];
};
