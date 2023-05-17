import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { payload } = action;
      state.user = payload.user;
      //  state.userData = payload.userData;
      //  console.log('newState', state);
    },

    logout: (state, action) => {
      state.user = null;
      // state.didTryAutoLogin = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
