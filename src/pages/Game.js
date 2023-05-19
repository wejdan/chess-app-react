import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Chessborad from "../componenets/Chessborad";

import { black, HEIGHT, SIZE, white, WIDTH } from "../utils/constants";
import PossibleMoves from "../componenets/PossibleMoves";
import TopBar from "../componenets/TopBar";
import GameoverModal from "../componenets/GameoverModal";

import Promotion from "../componenets/Promotion";
import { useDispatch, useSelector } from "react-redux";
import { movePiece, selectPiece, setGameData } from "../store/gameSlice";
import Player from "../componenets/Player";
import { off, onValue, ref } from "firebase/database";
import { database } from "../firebase";
import { acceptRematch, updateGame } from "../utils/chessOnline";

const Wrapper = styled.div`
  background-color: #222222;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
const PlayContainer = styled.div`
  background-color: red;
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  overflow: hidden;
`;
const NameContainer = styled.h3`
  color: white;
  margin: 0;
  display: inline-block;
  padding: 5px 10px;
  background-color: #19a7ce;
`;
const Status = styled.div`
  background-color: ${(props) => `${props.color}`};
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 25px;
  margin-left: 5px;
`;

function Game({
  me,
  opponent,
  isOpponentOnline,
  isOppenentWantRematch,
  isWatingOppenentResponse,
}) {
  const game = useSelector((state) => state.game);
  const room = useSelector((state) => state.room);
  const onlineUsers = useSelector((state) => state.users.onlineUsers);

  const dispatch = useDispatch();

  const activePiece = useRef(null);

  const handleMovingPiece = (row, col) => {
    dispatch(movePiece({ row, col }));
  };

  useEffect(() => {
    if (!game.turn) {
      //dispatch(setGameData({ turn: playerOne.color }));

      return;
    } else {
      updateGame(game, room.roomID);
    }
  }, [
    game.turn,
    game.shouldPawnPromote,
    game.board,
    game.end,
    room.roomID,
    dispatch,
  ]);
  useEffect(() => {
    if (!room.roomID) return;
    const gameRef = ref(database, `rooms/${room.roomID}/game`);

    onValue(gameRef, (snapshot) => {
      const data = snapshot.val();

      dispatch(setGameData(data));
    });

    return () => off(gameRef);
  }, [room, dispatch]);

  // useEffect(() => {
  //   if (!room.roomID) return;
  //   const turnRef = ref(database, `rooms/${room.roomID}/firstTurn`);

  //   onValue(turnRef, (snapshot) => {
  //     //    const data = snapshot.val();

  //     //    dispatch(setGameData(data));
  //  //   acceptRematch(room.roomID);
  //   });

  //   return () => off(turnRef);
  // }, [room, dispatch]);
  const onGrabPiece = (e) => {
    if (e.target.classList.contains("piece") && chessboardRef) {
      const { index, player } = e.target.dataset;

      if (game.turn == player && player == room.color) {
        const activeIndex = Number(index);
        dispatch(
          selectPiece({
            activeIndex: activeIndex,
            currPiece: game.board[activeIndex],
          })
        );
        activePiece.current = e.target;
        activePiece.current.style.zIndex = "100";
      } else {
        if (player != room.color) {
          alert("not your piece");
        } else {
          alert("not your turn");
        }
      }
    }
  };
  const onReleasePiece = (e) => {
    if (!activePiece.current || !chessboardRef) return;

    const newCol = Math.round(
      (e.clientX - chessboardRef.offsetLeft - SIZE / 2) / SIZE
    );
    const newRow = Math.round(
      (e.clientY - chessboardRef.offsetTop - SIZE / 2) / SIZE
    );
    const r = !room.isFirstPlayer ? 7 - newRow : newRow;
    const c = !room.isFirstPlayer ? 7 - newCol : newCol;

    if (game.possibleMoves.includes(`${r}*${c}`)) {
      const x = newCol * SIZE + chessboardRef.offsetLeft;
      const y = newRow * SIZE + chessboardRef.offsetTop;

      activePiece.current.style.top = `${y}px`;
      activePiece.current.style.left = `${x}px`;
      handleMovingPiece(r, c);
    } else {
      const r = !room.isFirstPlayer
        ? 7 - game.currPiece.pos.split("*")[0]
        : game.currPiece.pos.split("*")[0];
      const c = !room.isFirstPlayer
        ? 7 - game.currPiece.pos.split("*")[1]
        : game.currPiece.pos.split("*")[1];

      const x = c * SIZE + chessboardRef.offsetLeft;
      const y = r * SIZE + chessboardRef.offsetTop;

      activePiece.current.style.top = `${y}px`;
      activePiece.current.style.left = `${x}px`;
    }

    activePiece.current.style.zIndex = "0";
    activePiece.current = null;

    dispatch(setGameData({ possibleMoves: [] }));
  };
  const onMovePiece = (e) => {
    if (activePiece.current && chessboardRef) {
      const startLeft = chessboardRef.offsetLeft;
      const startTop = chessboardRef.offsetTop;
      const endLeft = chessboardRef.offsetLeft + chessboardRef.clientWidth;
      const endTop = chessboardRef.offsetTop + chessboardRef.clientHeight;
      const newY = e.clientY;
      const newX = e.clientX;

      if (newY >= startTop && newY <= endTop) {
        activePiece.current.style.top = `${newY - SIZE / 2}px`;
      }
      if (newX >= startLeft && newX <= endLeft) {
        activePiece.current.style.left = `${newX - SIZE / 2}px`;
      }
    }
  };

  const [chessboardRef, setChessboardRef] = useState();

  return (
    <Wrapper
      onMouseMove={onMovePiece}
      onMouseDown={onGrabPiece}
      onMouseUp={onReleasePiece}
    >
      <TopBar />
      {game.board && (
        <>
          <div
            style={{
              marginTop: 50,
              display: "flex",
              flexDirection: "row",
              maxWidth: "100%",
              height: 40,
            }}
          >
            {game.board.map((p, i) => {
              if (p.player == me.color && p.isDeleted) {
                return <img src={p.img} style={{ width: 40, height: 40 }} />;
              }
            })}
          </div>
          <div>
            <NameContainer>
              {opponent.name}
              <Status
                color={onlineUsers.includes(opponent.uid) ? "green" : "red"}
              />
            </NameContainer>

            <PlayContainer
              ref={(newRef) => {
                setChessboardRef(newRef);
              }}
              width={WIDTH}
              height={HEIGHT}
              style={{ pointerEvents: game.end.isGameEnded ? "none" : "auto" }}
            >
              <Chessborad />

              <Player
                chessboardRef={chessboardRef}
                name={opponent.color}
                isTop={true}
              />

              <Player chessboardRef={chessboardRef} name={me.color} />

              <PossibleMoves chessboardRef={chessboardRef} />
            </PlayContainer>

            <NameContainer>
              {me.name}
              <Status color={onlineUsers.includes(me.uid) ? "green" : "red"} />
            </NameContainer>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              maxWidth: "100%",
              height: 40,
            }}
          >
            {game.board.map((p, i) => {
              if (p.player == opponent.color && p.isDeleted) {
                return <img src={p.img} style={{ width: 40, height: 40 }} />;
              }
            })}
          </div>
          <GameoverModal
            isOppenentWantRematch={isOppenentWantRematch}
            isWatingOppenentResponse={isWatingOppenentResponse}
            isOpponentOnline={isOpponentOnline}
            opponent={opponent}
            me={me}
          />
          {game.shouldPawnPromote && game.turn != room.color && <Promotion />}
        </>
      )}
    </Wrapper>
  );
}

export default Game;
