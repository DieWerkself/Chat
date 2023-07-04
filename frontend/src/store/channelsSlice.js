/* eslint-disable no-param-reassign */

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    updateChannel: channelsAdapter.updateOne,
    removeChannel: (state, { payload }) => {
      channelsAdapter.removeOne(state, payload.id);
    },
    setActiveChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
});

export const channelsSelector = channelsAdapter.getSelectors(
  (state) => state.channels,
);
export const {
  addChannels,
  addChannel,
  setActiveChannelId,
  removeChannel,
  updateChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
