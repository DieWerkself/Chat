import React, { createContext } from 'react';
import { addMessage } from '../../store/messagesSlice';
import { useDispatch } from 'react-redux';

export const SocketContext = createContext();

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));
  });

  const addNewMessage = (message, username, channelId) => {
    socket.emit('newMessage', { message, username, channelId });
  };
  return (
    <SocketContext.Provider value={{ addNewMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
