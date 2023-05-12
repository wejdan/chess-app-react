import React, { createContext, useCallback, useEffect, useState } from "react";
import blackPawn from "../assets//bp.png";
import whitePawn from "../assets/wp.png";
import { black, white } from "../utils/constants";
export const Context = createContext();
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

const p = [];

for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 8; col++) {
    const key = `${row}` + "*" + `${col}`;

    if (row == 0) {
      p.push({
        name: "b" + names[col],
        pos: key,
        player: "black",
        isDeleted: false,
        type: types[col],
        img: black[col].img,
      });
    } else if (row == 1) {
      p.push({
        name: "b" + "p" + col,
        pos: key,
        player: "black",
        isDeleted: false,
        type: "pawn",
        img: blackPawn,
      });
    } else if (row == 6) {
      p.push({
        name: "w" + "p" + col,
        pos: key,
        player: "white",
        isDeleted: false,
        type: "pawn",
        img: whitePawn,
      });
    } else if (row == 7) {
      p.push({
        name: "w" + names[col],
        pos: key,
        player: "white",
        isDeleted: false,
        type: types[col],
        img: white[col].img,
      });
    }
  }
}

export const ContextProvider = ({ children }) => {
  const [board, setBoard] = useState(p);
  const [turn, setTurn] = useState("black");
  const [total, setTotal] = useState(0);

  const [movs, setMovs] = useState([]);
  const [attacks, seAttacks] = useState([]);

  const [active, seActive] = useState(null);
  const [history, setHistory] = useState([]);
  const [forward, setForward] = useState([]);
  const [isCheckMate, setIsCheckMate] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isPromoation, setIsPromoation] = useState(false);
  useEffect(() => {
    setMovs([]);
  }, [turn]);

  const init = () => {
    setTurn("black");

    setBoard(p);
    setHistory([]);
    setForward([]);
    setMovs([]);
    setIsCheckMate(false);
    setIsGameOver(false);
    setWinner(null);
  };
  const goBack = () => {
    if (history.length == 0) {
      return;
    }

    setTurn(turn == "black" ? "white" : "black");
    const oldHistory = [...history];
    const forwardList = [...forward];

    const step = oldHistory.pop();
    forwardList.push({ board: board, isCheck: isCheckMate });
    setForward(forwardList);
    setHistory(oldHistory);

    setBoard(step.board);
    setIsCheckMate(step.isCheck);
  };
  const goForward = () => {
    if (forward.length == 0) {
      return;
    }
    setTurn(turn == "black" ? "white" : "black");

    const oldHistory = [...history];
    const forwardList = [...forward];

    const step = forwardList.pop();

    oldHistory.push({ board: board, isCheck: isCheckMate });
    setForward(forwardList);
    setHistory(oldHistory);

    setBoard(step.board);
    setIsCheckMate(step.isCheck);
    //  console.log('step:', step);
  };
  return (
    <Context.Provider
      value={{
        board,
        setBoard,
        turn,
        setTurn,
        movs,
        setMovs,
        active,
        seActive,
        history,
        setHistory,
        forward,
        setForward,
        isCheckMate,
        setIsCheckMate,
        init,
        goBack,
        goForward,
        isGameOver,
        setIsGameOver,
        winner,
        setWinner,
        isPromoation,
        setIsPromoation,
        attacks,
        seAttacks,
        total,
        setTotal,
      }}
    >
      {children}
    </Context.Provider>
  );
};
