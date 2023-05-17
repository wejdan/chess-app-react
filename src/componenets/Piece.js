import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { HEIGHT, SIZE, WIDTH, width } from "../utils/constants";
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
  const game = useSelector((state) => state.game);

  const [opacity, setOpacity] = useState(1);

  let x =
    chessboardRef &&
    game.board[index].pos.split("*")[1] * SIZE + chessboardRef.offsetLeft;
  let y =
    chessboardRef &&
    game.board[index].pos.split("*")[0] * SIZE + chessboardRef.offsetTop;
  useEffect(() => {}, []);
  useEffect(() => {
    if (game.board[index].isDeleted) {
      setOpacity(0);
    } else if (game.board[index].isDeleted == false && opacity == 0) {
      setOpacity(1);
    }
  }, [game.board]);

  return (
    <Wrapper
      data-index={index}
      data-player={player}
      className="piece"
      style={{
        pointerEvents: opacity == 0 ? "none" : "auto",
        backgroundImage: `url(${game.board[index].img})`,
        top: y,
        left: x,
      }}
      opacity={opacity}
      // onClick={handleClick}
      height={SIZE}
      width={SIZE}
      x={x}
      y={y}
      isActive={game.activeIndex == index}
      isMyTurn={game.turn == player}
    ></Wrapper>
  );
}

export default Piece;
