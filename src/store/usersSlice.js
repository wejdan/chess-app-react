import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  onlineUsers: [],
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { payload } = action;
      if (!state.onlineUsers.includes(payload.user)) {
        state.onlineUsers = [...state.onlineUsers, payload.user];
      }
      //  state.userData = payload.userData;
      //  console.log('newState', state);
    },

    removeUser: (state, action) => {
      const { payload } = action;
      state.onlineUsers = state.onlineUsers.filter((user, i) => {
        return user != payload.user;
      });
      //  state.userData = payload.userData;
      //  console.log('newState', state);
    },
    setUsers: (state, action) => {
      const { payload } = action;
      state.onlineUsers = payload.users;
      //  state.userData = payload.userData;
      //  console.log('newState', state);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser, removeUser, setUsers } = authSlice.actions;

export default authSlice.reducer;
