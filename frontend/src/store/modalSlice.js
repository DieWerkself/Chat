import { createSlice } from '@reduxjs/toolkit';

// Начальное значение
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
      console.log(state.data);
      console.log(state.isModalShow);
    },
    close: (state) => {
      state.isModalShow = false;
    },
  },
});

export const { open, close } = modalSlice.actions;

export default modalSlice.reducer;
