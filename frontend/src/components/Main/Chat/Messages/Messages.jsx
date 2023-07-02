import React from 'react';

const Messages = ({ currentChannelChat }) => {
  const renderMessages = () => {
    return (
      <>
        {currentChannelChat.map(({ message, id, username }) => (
          <div
            key={id}
            id="messages-box"
            className="chat-messages overflow-auto px-5 "
          >
            <div className="text-break mb-2">
              <b>{username}</b>: {message}
            </div>
          </div>
        ))}
      </>
    );
  };
  return <>{renderMessages()}</>;
};

export default Messages;
