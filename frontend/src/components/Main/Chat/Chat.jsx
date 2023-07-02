import React, { useContext, useState } from 'react';
import { SocketContext } from '../../Providers/SocketProvider';
import Messages from './Messages/Messages';
import MessageInputField from './MessageInputField/MessageInputField';
import Modal from '../../Modal/Modal';

const Chat = ({ messages, channels, currentChannelId }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const { addNewMessage } = useContext(SocketContext);
  const currentChannelChat = messages.filter(
    ({ channelId }) => channelId === currentChannelId
  );
  const channel = channels.find(({ id }) => id === currentChannelId);

  const handlerTyping = (e) => {
    setCurrentMessage(e.target.value);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log(currentChannelId);
    const username = JSON.parse(localStorage.user).username;
    addNewMessage(currentMessage, username, currentChannelId);
    setCurrentMessage('');
  };

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># {channel.name}</b>
          </p>
          <span className="text-muted">
            {currentChannelChat.length} сообщений
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          <Messages currentChannelChat={currentChannelChat} />
        </div>
        <MessageInputField
          handlerSubmit={handlerSubmit}
          handlerTyping={handlerTyping}
          currentMessage={currentMessage}
        />
        <Modal />
      </div>
    </div>
  );
};

export default Chat;
