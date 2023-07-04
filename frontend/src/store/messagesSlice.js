import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload }) => {
      const restEntities = Object.values(state.entities).filter(
        (e) => e.channelId !== payload.id,
      );
      messagesAdapter.setAll(state, restEntities);
    });
  },
});

export const messagesSelector = messagesAdapter.getSelectors(
  (state) => state.messages,
);
export const { addMessages, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
