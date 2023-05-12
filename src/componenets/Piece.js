import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Context } from "../contexts/Context";
import { HEIGHT, SIZE, WIDTH, width } from "../utils/constants";
import { calculateMovs } from "../utils/movesCalculation";
const Wrapper = styled.div`
  position: absolute;

  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  opacity: ${(props) => props.opacity};
  background-size: ${(props) => `${props.height}px`};
  background-repeat: no-repeat;
  background-position: center;

  cursor: ${(props) => (props.isMyTurn ? "grabbing" : "no-drop")};
`;

function Piece({ index, chessboardRef, player }) {
  const { board, turn, active } = useContext(Context);
  const [opacity, setOpacity] = useState(1);

  let x =
    chessboardRef &&
    board[index]?.pos.split("*")[1] * SIZE + chessboardRef.offsetLeft;
  let y =
    chessboardRef &&
    board[index]?.pos.split("*")[0] * SIZE + chessboardRef.offsetTop;

  useEffect(() => {
    if (board[index].isDeleted) {
      setOpacity(0);
    } else if (board[index].isDeleted == false && opacity == 0) {
      setOpacity(1);
    }
  }, [board]);

  return (
    <Wrapper
      data-index={index}
      data-player={player}
      className="piece"
      style={{
        pointerEvents: opacity == 0 ? "none" : "auto",
        backgroundImage: `url(${board[index].img})`,
        top: y,
        left: x,
      }}
      opacity={opacity}
      // onClick={handleClick}
      height={SIZE}
      width={SIZE}
      x={x}
      y={y}
      isActive={active == index}
      isMyTurn={turn == player}
    ></Wrapper>
  );
}

export default Piece;
