import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import modalReducer from './modalSlice';

export const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReducer,
  },
});
