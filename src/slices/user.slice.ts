import { createSlice } from "@reduxjs/toolkit";
import type { UserType } from "../types/component.types";

const initialState: UserType = {
  _id: "",
  name: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: () => {
      return initialState;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
