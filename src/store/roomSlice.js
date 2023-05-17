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

const initialState = {
  roomID: null,
  status: null,
  color: null,
  name: null,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    startGame: (state, action) => {
      state.status = "started";
    },

    setRoomData: (state, action) => {
      if (action.payload) {
        return { ...state, ...action.payload };
      }
      return state;
    },
    resetRoom: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { startGame, setRoomData, resetRoom } = roomSlice.actions;

export default roomSlice.reducer;
