import React, { createContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../store/messagesSlice';
import {
  addChannel,
  removeChannel,
  updateChannel,
} from '../../store/channelsSlice';

export const SocketContext = createContext();

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId,
  );

  useEffect(() => {
    const onNewMessage = (message) => {
      dispatch(addMessage(message));
    };

    const onNewChannel = (channel) => {
      dispatch(addChannel(channel));
    };

    const onRemoveChannel = (id) => {
      dispatch(removeChannel(id));
    };

    const onRenameChannel = (channel) => {
      dispatch(
        updateChannel({ id: channel.id, changes: { name: channel.name } }),
      );
    };

    socket.on('newMessage', onNewMessage);
    socket.on('newChannel', onNewChannel);
    socket.on('removeChannel', onRemoveChannel);
    socket.on('renameChannel', onRenameChannel);
    return () => {
      socket.off('newMessage', onNewMessage);
      socket.off('newChannel', onNewChannel);
      socket.off('removeChannel', onRemoveChannel);
      socket.off('renameChannel', onRenameChannel);
    };
  }, [currentChannelId]);

  const addNewMessage = async (message, username, channelId, date) => {
    await socket.emit('newMessage', {
      message, username, channelId, date,
    });
  };

  const addNewChannel = (name, callback) => {
    socket.emit('newChannel', {
      name,
    }, ({ data }) => { callback(data); });
  };

  const deleteChannel = async (id) => {
    await socket.emit('removeChannel', { id });
  };

  const renameChannel = async (id, name) => {
    await socket.emit('renameChannel', { id, name });
  };

  return (
    <SocketContext.Provider
      value={{
        addNewMessage, addNewChannel, deleteChannel, renameChannel,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
