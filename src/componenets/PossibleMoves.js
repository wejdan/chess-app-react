import React, { useContext } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Context } from "../contexts/Context";
import { OnlineContext } from "../contexts/OnlineGameContext";
import { HEIGHT, SIZE, WIDTH, width } from "../utils/constants";

function PossibleMoves({ chessboardRef }) {
  // const { movs, attacks } = useContext(Context);
  const game = useSelector((state) => state.game);
  return (
    <>
      {game.possibleMoves.map((m, j) => {
        const [row, col] = m.split("*");
        if (Number(row) > 7 || Number(col) > 7) {
          return;
        }
        if (Number(row) < 0 || Number(col) < 0) {
          return;
        }
        const isAttack = game.validAttacks.includes(m);
        return (
          <div
            key={m}
            style={{
              position: "absolute",
              width: SIZE,
              height: SIZE,
              left: col * SIZE + chessboardRef.offsetLeft,
              top: row * SIZE + chessboardRef.offsetTop,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "grab",
            }}
          >
            {isAttack ? (
              <div
                style={{
                  width: SIZE,
                  height: SIZE,

                  borderColor: "black",
                  borderWidth: 2,
                  borderStyle: "solid",
                  borderRadius: SIZE / 2,
                  //   backgroundColor: "rgba(255,0,0,0.3)",
                  opacity: 0.5,
                }}
              />
            ) : (
              <div
                style={{
                  width: SIZE / 2,
                  height: SIZE / 2,
                  backgroundColor: "black",

                  borderRadius: SIZE / 2,
                  opacity: 0.3,
                }}
              />
            )}
          </div>
        );
      })}
    </>
  );
}

export default PossibleMoves;
