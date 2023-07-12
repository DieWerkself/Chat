import React, { useEffect, useRef } from 'react';
import filter from 'leo-profanity';
import classNames from 'classnames';

const Messages = ({ currentChannelChat, authUsername }) => {
  const scrollToLastEl = useRef(null);

  useEffect(() => {
    scrollToLastEl.current.scrollIntoView({ behavior: 'smooth' });
  }, [currentChannelChat]);
  filter.loadDictionary();
  return (
    <>
      {currentChannelChat.map(({
        message, id, username, date,
      }) => {
        const colors = classNames({
          'chat-messages': true,
          'overflow-auto': true,
          'p-1': true,
          'rounded-3': true,
          'my-3': true,
          'shadow-sm': true,
          'text-warning-emphasis': username === authUsername,
          'bg-warning-subtle': username === authUsername,
          'text-secondary-emphasis': username !== authUsername,
          'bg-secondary-subtle': username !== authUsername,
        });

        const [hours, minutes] = new Date(date).toLocaleString().split(' ')[1].split(':');

        return (
          <div key={id} id="messages-box" className={colors}>
            <div className="ps-1" style={{ fontSize: '0.7rem' }}>
              {hours}
              :
              {minutes}
            </div>
            <div className="text-break px-2 pb-2">
              <b>{username}</b>
              :&nbsp;
              {filter.clean(message)}
            </div>
          </div>
        );
      })}
      <div ref={scrollToLastEl} />
    </>
  );
};

export default Messages;
