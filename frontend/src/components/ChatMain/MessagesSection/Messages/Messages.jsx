import React from 'react';
import filter from 'leo-profanity';

const Messages = ({ currentChannelChat }) => {
  filter.loadDictionary();
  return (
    <>
      {currentChannelChat.map(({ message, id, username }) => (
        <div
          key={id}
          id="messages-box"
          className="chat-messages overflow-auto px-5 "
        >
          <div className="text-break mb-2">
            <b>{username}</b>
            :&nbsp;
            {filter.clean(message)}
          </div>
        </div>
      ))}
    </>
  );
};

export default Messages;
