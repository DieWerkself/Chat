import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: (state, action) => {
      const data = action.payload;
      state.messages = data;
    },
    addMessage: (state, action) => {
      const data = action.payload;
      console.log(data);
      state.messages.push(data);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMessages, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
