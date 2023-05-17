import React, { createContext, useCallback, useEffect, useState } from "react";
import blackPawn from "../assets//bp.png";
import whitePawn from "../assets/wp.png";
import { black, white } from "../utils/constants";
export const OnlineContext = createContext();
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
const game = {
  board: p,
  turn: "black", //"W" | "B",
  activePlayerStatus: "", //"selecting" | "moving",
  activeIndex: null,
  possibleMoves: [],
  notation: [],
  captured: {
    W: [],
    B: [],
  },
  shouldPawnPromote: false,

  end: {
    isGameEnded: false,
    howIsGameEnded: "", // checkmate, resign
    winner: "",
    loser: "",
    isRematch: false,
  },
};

const room = {
  roomID: "",
  status: null, // null | "started" | "pending" | "loading" | "error";
  color: null, // null | "W" | "B";
  name: "", // null | string;
};

export const OnlineContextProvider = ({ children }) => {
  const [gameState, setGameState] = useState(game);
  const [roomState, setRoomState] = useState(room);

  const [history, setHistory] = useState([]);
  const [forward, setForward] = useState([]);
  const [isCheckMate, setIsCheckMate] = useState(false);

  const updateGame = useCallback((key, value) => {
    console.log("updateGame", key, value);
    console.log("gameState", gameState);

    const newGameObj = { ...gameState, [key]: value };

    setGameState((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  });
  const init = () => {
    setGameState(game);
  };
  return (
    <OnlineContext.Provider
      value={{
        init,
        gameState,
        setGameState,
        roomState,
        setRoomState,
        history,
        setHistory,
        forward,
        setForward,
        isCheckMate,
        setIsCheckMate,
        updateGame,
      }}
    >
      {children}
    </OnlineContext.Provider>
  );
};
