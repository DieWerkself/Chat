import React, { createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../store/messagesSlice';
import {
  addChannel,
  setActiveChannelId,
  removeChannel,
  updateChannel,
} from '../../store/channelsSlice';

export const SocketContext = createContext();

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId
  );

  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));
  });

  socket.on('newChannel', (channel) => {
    dispatch(addChannel(channel));
  });

  socket.on('removeChannel', (id) => {
    dispatch(removeChannel(id));
    if (id.id === currentChannelId) {
      console.log('test');
      dispatch(setActiveChannelId(1));
    }
  });

  socket.on('renameChannel', (channel) => {
    dispatch(
      updateChannel({ id: channel.id, changes: { name: channel.name } })
    );
  });

  const addNewMessage = (message, username, channelId) => {
    socket.emit('newMessage', { message, username, channelId });
  };

  const addNewChannel = async (channelName) => {
    const { data } = await socket.emitWithAck('newChannel', {
      name: channelName,
    });
    dispatch(addChannel(data));
    dispatch(setActiveChannelId(data.id));
  };

  const deleteChannel = (id) => {
    socket.emit('removeChannel', { id });
  };

  const renameChannel = (id, name) => {
    socket.emit('renameChannel', { id, name });
  };
  return (
    <SocketContext.Provider
      value={{ addNewMessage, addNewChannel, deleteChannel, renameChannel }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
