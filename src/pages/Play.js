import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Chessborad from "../componenets/Chessborad";
import Piece from "../componenets/Piece";

import { black, HEIGHT, SIZE, white, WIDTH } from "../utils/constants";
import PossibleMoves from "../componenets/PossibleMoves";
import { Context } from "../contexts/Context";
import BottomBar from "../componenets/BottomBar";
import TopBar from "../componenets/TopBar";
import GameoverModal from "../componenets/GameoverModal";
import Modal from "../componenets/Modal";
import {
  calculateMovs,
  calculateNewBoard,
  canAttackKing,
  filterValidMovs,
  isSafeTile,
  isTeamHaveValidMoves,
  isTileEmpty,
  kingCasling,
} from "../utils/movesCalculation";
import Promotion from "../componenets/Promotion";

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

const soldires = Array(8)
  .fill()
  .map((v, i) => i);
function Play() {
  const [open, setOpen] = useState(false);

  const {
    board,
    turn,
    active,
    isCheckMate,
    setIsCheckMate,
    seActive,
    setTurn,
    setForward,
    setHistory,
    setBoard,
    history,
    setMovs,
    movs,
    setWinner,
    setIsGameOver,
    isGameOver,
    isPromoation,
    setIsPromoation,
    seAttacks,
    total,
    setTotal,
  } = useContext(Context);
  useEffect(() => {
    if (isCheckMate) {
      //  setOpen(true);
    }
  }, [isCheckMate]);
  const activePiece = useRef(null);

  const handleMovingPiece = (row, col) => {
    setMovs([]);

    //const key = `${row}` + "*" + `${col}`;

    const current = board[active];
    const isCheck = calculateMovs(row, col, current, board, true);
    const oldHistory = [...history];
    oldHistory.push({ board: board, isCheck: isCheckMate });
    setIsCheckMate(isCheck);

    setHistory(oldHistory);

    setForward([]);
    const newBoard = calculateNewBoard(row, col, board, active);
    setBoard(newBoard);
    const otherTeamHasMoves = isTeamHaveValidMoves(
      turn == "black" ? "white" : "black",
      newBoard
    );

    if (!otherTeamHasMoves && isCheck) {
      setIsGameOver(true);
      setWinner(current.player);
    } else if (!otherTeamHasMoves && !isCheck) {
      const thisTeamHasMoves = isTeamHaveValidMoves(turn, newBoard);
      if (!thisTeamHasMoves) {
        setIsGameOver(true);
        setWinner("Tie");
      }
    }

    const isPromoting = current.player == "black" ? row == 7 : row == 0;
    if (isPromoting && current.type == "pawn") {
      // console.log("promoting");
      setIsPromoation(true);
    }
    setTurn(turn == "black" ? "white" : "black");
    setTotal(total + 1);
  };
  const onGrabPiece = (e) => {
    if (e.target.classList.contains("piece") && chessboardRef.current) {
      const { index, player } = e.target.dataset;
      if (turn == player) {
        const activeIndex = Number(index);
        seActive(activeIndex);
        const row = Number(board[activeIndex].pos.split("*")[0]);
        const col = Number(board[activeIndex].pos.split("*")[1]);

        const myKingPos = board.find(
          (p, i) => p.player == turn && p.type == "king"
        );

        const [validMovs, validAttacks] = filterValidMovs(
          row,
          col,
          board,
          activeIndex,
          player,
          myKingPos.pos,
          board[activeIndex]
        );
        if (board[activeIndex].type == "king" && !board[activeIndex].moved) {
          // const left1 = isTileEmpty(row, col - 1, board);
          // const left2 = isTileEmpty(row, col - 2, board);
          // const left3 = isTileEmpty(row, col - 3, board);

          // const right1 = isTileEmpty(row, col + 1, board);
          // const right2 = isTileEmpty(row, col + 2, board);

          // if (left1 && left2 && left3) {
          //   const isRockMoved = board[activeIndex - 4].moved;
          //   if (!isRockMoved) {
          //     const castlingLeft = `${row}` + "*" + `${col - 4}`;

          //     validAttacks.push(castlingLeft);
          //     validMovs.push(castlingLeft);
          //   }
          // }
          // if (right1 && right2) {
          //   const isRockMoved = board[activeIndex + 3].moved;
          //   if (!isRockMoved) {
          //     const castlingRight = `${row}` + "*" + `${col + 3}`;

          //     validAttacks.push(castlingRight);
          //     validMovs.push(castlingRight);
          //   }
          // }
          const caslingMovs = kingCasling(
            row,
            col,
            board[activeIndex],
            board,
            activeIndex
          );
          caslingMovs.map((m) => {
            validAttacks.push(m);
            validMovs.push(m);
          });
          console.log("caslingMovs==", caslingMovs, "");
        }
        setMovs(validMovs);
        seAttacks(validAttacks);

        activePiece.current = e.target;
        activePiece.current.style.zIndex = "100";
      } else {
        alert("not your turn");
      }
    }
  };
  const onReleasePiece = (e) => {
    if (!activePiece.current || !chessboardRef.current) return;

    const newCol = Math.round(
      (e.clientX - chessboardRef.current.offsetLeft - SIZE / 2) / SIZE
    );
    const newRow = Math.round(
      (e.clientY - chessboardRef.current.offsetTop - SIZE / 2) / SIZE
    );

    if (movs.includes(`${newRow}*${newCol}`)) {
      const x = newCol * SIZE + chessboardRef.current.offsetLeft;
      const y = newRow * SIZE + chessboardRef.current.offsetTop;

      activePiece.current.style.top = `${y}px`;
      activePiece.current.style.left = `${x}px`;
      handleMovingPiece(newRow, newCol);
    } else {
      const x =
        board[active]?.pos.split("*")[1] * SIZE +
        chessboardRef.current.offsetLeft;
      const y =
        board[active]?.pos.split("*")[0] * SIZE +
        chessboardRef.current.offsetTop;

      activePiece.current.style.top = `${y}px`;
      activePiece.current.style.left = `${x}px`;
    }

    activePiece.current.style.zIndex = "0";
    activePiece.current = null;
    setMovs([]);
  };
  const onMovePiece = (e) => {
    if (activePiece.current && chessboardRef.current) {
      const startLeft = chessboardRef.current.offsetLeft;
      const startTop = chessboardRef.current.offsetTop;
      const endLeft =
        chessboardRef.current.offsetLeft + chessboardRef.current.clientWidth;
      const endTop =
        chessboardRef.current.offsetTop + chessboardRef.current.clientHeight;
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
  const chessboardRef = useRef(null);
  return (
    <Wrapper
      onMouseMove={onMovePiece}
      onMouseDown={onGrabPiece}
      onMouseUp={onReleasePiece}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "100%",
          height: 40,
        }}
      >
        {board.map((p, i) => {
          if (p.player == "white" && p.isDeleted) {
            return <img src={p.img} style={{ width: 40, height: 40 }} />;
          }
        })}
      </div>
      <div>
        <TopBar />

        <PlayContainer
          ref={chessboardRef}
          width={WIDTH}
          height={HEIGHT}
          style={{ pointerEvents: isGameOver ? "none" : "auto" }}
        >
          <Chessborad />

          {black.map((p, i) => {
            return (
              <Piece
                key={i}
                type={p.type}
                player={p.player}
                name={p.name}
                index={i}
                chessboardRef={chessboardRef.current}
              />
            );
          })}

          {soldires.map((_, i) => {
            return (
              <Piece
                key={i}
                type="pawn"
                player="black"
                name={"bp" + i}
                index={8 + i}
                chessboardRef={chessboardRef.current}
              />
            );
          })}

          {white.map((p, i) => {
            return (
              <Piece
                key={i}
                type={p.type}
                player={p.player}
                name={p.name}
                index={i + 24}
                chessboardRef={chessboardRef.current}
              />
            );
          })}
          {soldires.map((_, i) => {
            return (
              <Piece
                key={i}
                type="pawn"
                player="white"
                name={"wp" + i}
                index={16 + i}
                chessboardRef={chessboardRef.current}
              />
            );
          })}
          <PossibleMoves chessboardRef={chessboardRef.current} />
        </PlayContainer>
        <BottomBar />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "100%",
          height: 40,
        }}
      >
        {board.map((p, i) => {
          if (p.player == "black" && p.isDeleted) {
            return <img src={p.img} style={{ width: 40, height: 40 }} />;
          }
        })}
      </div>
      {isGameOver && <GameoverModal />}
      {open && (
        <Modal setOpen={setOpen}>
          <p
            style={{
              fontSize: 30,
              fontVariant: ["tabular-nums"],
              opacity: isCheckMate ? 1 : 0,
              pointerEvents: "none",
            }}
          >
            CHEECK
          </p>
        </Modal>
      )}
      {isPromoation && <Promotion />}
    </Wrapper>
  );
}

export default Play;
