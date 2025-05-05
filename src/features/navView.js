import { createSlice } from "@reduxjs/toolkit";

export const chat = { view: "chat" };
export const search = { view: "search" };

const initialState = {
  currentView: chat.view,
};

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    switchToChat(state) {
      state.currentView = chat.view;
    },
    switchToSearch(state) {
      state.currentView = search.view;
    },
  },
});

export const { switchToChat, switchToSearch } = viewSlice.actions;
export default viewSlice.reducer;
