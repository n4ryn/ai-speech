import { createSlice } from "@reduxjs/toolkit";

const initialState: string = "Xenova/whisper-tiny.en";

export const aiModelSlice = createSlice({
  name: "aiModel",
  initialState,
  reducers: {
    updateAiModel: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateAiModel } = aiModelSlice.actions;
export default aiModelSlice.reducer;
