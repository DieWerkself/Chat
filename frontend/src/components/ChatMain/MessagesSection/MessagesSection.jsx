import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { SocketContext } from '../../Providers/SocketProvider';
import { AuthContext } from '../../Providers/AuthProvider';
import 'react-toastify/dist/ReactToastify.css';
import Messages from './Messages/Messages';
import MessageInputField from './MessageInputField/MessageInputField';
import Modal from '../../Modal/Modal';

const MessagesSection = ({ messages, channels, currentChannelId }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const { addNewMessage } = useContext(SocketContext);
  const { userData } = useContext(AuthContext);
  const { t } = useTranslation();
  const currentChannelChat = messages.filter(
    ({ channelId }) => channelId === currentChannelId,
  );
  const channel = channels.find(({ id }) => id === currentChannelId);

  const handlerTyping = (e) => {
    setCurrentMessage(e.target.value);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    addNewMessage(
      currentMessage,
      userData.getUsername(),
      currentChannelId,
      new Date().toISOString(),
      (responseData) => {
        if (responseData === 'error') {
          toast.error(t('notify.networkError'));
        }
      },
    );
    setCurrentMessage('');
  };

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #&nbsp;
              {filter.clean(channel.name)}
            </b>
          </p>
          <span className="text-muted">
            {t('messages.message', { count: currentChannelChat.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          <Messages
            currentChannelChat={currentChannelChat}
            authUsername={userData.getUsername()}
          />
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

export default MessagesSection;
