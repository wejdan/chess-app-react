import { createSlice } from "@reduxjs/toolkit";
import blackPawn from "../assets//bp.png";
import whitePawn from "../assets/wp.png";
import { getRowAndCol } from "../utils/boardHelper";
import { black, white } from "../utils/constants";
import {
  calculateMovs,
  calculateNewBoard,
  filterValidMovs,
  isTeamHaveValidMoves,
  kingCasling,
} from "../utils/movesCalculation";
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

const initialState = {
  board: null,
  turn: null, //"W" | "B",
  activePlayerStatus: "", //"selecting" | "moving",
  activeIndex: null,
  currPiece: null,
  possibleMoves: [],
  validAttacks: [],
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

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    selectPiece: (state, action) => {
      const { payload } = action;

      state.activeIndex = payload.activeIndex;
      state.currPiece = payload.currPiece;

      const [row, col] = getRowAndCol(payload.currPiece);

      const myKingPos = state.board.find(
        (p, i) => p.player == state.turn && p.type == "king"
      );

      const [validMovs, validAttacks] = filterValidMovs(
        row,
        col,
        state.board,
        payload.activeIndex,
        state.turn,
        myKingPos.pos,
        payload.currPiece
      );
      if (payload.currPiece.type == "king" && !payload.currPiece.moved) {
        const caslingMovs = kingCasling(
          row,
          col,
          payload.currPiece,
          state.board,
          payload.activeIndex
        );
        caslingMovs.map((m) => {
          validAttacks.push(m);
          validMovs.push(m);
        });
      }
      //    setMovs(validMovs);
      //   seAttacks(validAttacks);
      state.possibleMoves = validMovs;
      state.validAttacks = validAttacks;
    },
    movePiece: (state, action) => {
      const { row, col } = action.payload;
      state.possibleMoves = [];
      state.validAttacks = [];
      const isCheck = calculateMovs(
        row,
        col,
        state.currPiece,
        state.board,
        true
      );

      const newBoard = calculateNewBoard(
        row,
        col,
        state.board,
        state.activeIndex
      );

      state.board = newBoard;

      const otherTeamHasMoves = isTeamHaveValidMoves(
        state.turn == "black" ? "white" : "black",
        newBoard
      );

      if (!otherTeamHasMoves && isCheck) {
        state.end.isGameEnded = true;
        state.end.winner = state.turn;
      } else if (!otherTeamHasMoves && !isCheck) {
        const thisTeamHasMoves = isTeamHaveValidMoves(state.turn, newBoard);
        if (!thisTeamHasMoves) {
          state.end.isGameEnded = true;
          state.end.winner = "tie";
        }
      }

      const isPromoting = !state.currPiece.isFirstPlayer ? row == 7 : row == 0;
      if (isPromoting && state.currPiece.type == "pawn") {
        state.shouldPawnPromote = true;
      }
      state.turn = state.turn == "black" ? "white" : "black";
    },
    promotePawnTo: (state, action) => {
      const { newType } = action.payload;
      const newPositions = [...state.board];
      const current = newPositions[state.activeIndex];
      newPositions[state.activeIndex] = {
        ...current,
        type: newType.type,
        img: newType.img,

        moved: true,
      };

      state.board = newPositions;
      state.shouldPawnPromote = false;
    },
    setBoard: (state, action) => {
      state.board = action.payload.board;
    },
    setGameData: (state, action) => {
      if (action.payload) {
        return { ...state, ...action.payload };
      }
      return state;
    },
    reset: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  selectPiece,
  movePiece,
  setBoard,
  promotePawnTo,
  reset,
  setGameData,
} = gameSlice.actions;

export default gameSlice.reducer;
