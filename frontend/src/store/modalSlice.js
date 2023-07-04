/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalShow: false,
  data: {},
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state, action) => {
      const data = action.payload;
      state.data = data;
      state.isModalShow = true;
    },
    close: (state) => {
      state.isModalShow = false;
    },
  },
});

export const { open, close } = modalSlice.actions;

export default modalSlice.reducer;
