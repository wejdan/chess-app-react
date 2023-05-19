import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { SIZE } from "../utils/constants";
const Wrapper = styled.div`
  position: absolute;

  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  opacity: ${(props) => props.opacity};
  background-size: ${(props) => `${props.height}px`};
  background-repeat: no-repeat;
  background-position: center;

  cursor: ${(props) => (props.myPiece ? "grabbing" : "no-drop")};
`;

function Piece({ index, chessboardRef }) {
  const game = useSelector((state) => state.game);
  const room = useSelector((state) => state.room);

  const [opacity, setOpacity] = useState(1);
  const row = !room.isFirstPlayer
    ? 7 - game.board[index].pos.split("*")[0]
    : game.board[index].pos.split("*")[0];

  const col = !room.isFirstPlayer
    ? 7 - game.board[index].pos.split("*")[1]
    : game.board[index].pos.split("*")[1];
  let x = chessboardRef && col * SIZE + chessboardRef.offsetLeft;
  let y = chessboardRef && row * SIZE + chessboardRef.offsetTop;
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
      data-player={game.board[index].player}
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
      isMyTurn={game.turn == game.board[index].player}
      myPiece={room.color == game.board[index].player}
    ></Wrapper>
  );
}

export default Piece;
