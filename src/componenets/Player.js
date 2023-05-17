import React from "react";
import Piece from "./Piece";
import { black, HEIGHT, SIZE, white, WIDTH } from "../utils/constants";
const soldires = Array(8)
  .fill()
  .map((v, i) => i);
function Player({ name, chessboardRef, isTop }) {
  const pieces = name == "black" ? black : white;
  return (
    <>
      {pieces.map((p, i) => {
        return (
          <Piece
            key={i}
            type={p.type}
            player={p.player}
            name={p.name}
            index={isTop ? i : i + 24}
            chessboardRef={chessboardRef}
          />
        );
      })}

      {soldires.map((_, i) => {
        return (
          <Piece
            key={i}
            type="pawn"
            player={name}
            name={`${name == "black" ? "bp" : "wb"}` + i}
            index={isTop ? 8 + i : i + 16}
            chessboardRef={chessboardRef}
          />
        );
      })}
    </>
  );
}

export default Player;
