import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  messages: [],
  currentChannelId: null,
};

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: (state, action) => {
      const data = action.payload;
      state.channels = data;
    },
    setActiveChannelId: (state, action) => {
      const data = action.payload;
      state.currentChannelId = data;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addChannels, setActiveChannelId } = channelsSlice.actions;

export default channelsSlice.reducer;
