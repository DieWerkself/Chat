import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactSVG } from 'react-svg';
import Arrow from '../../../../assets/ArrowIcon.svg';

const MessageInputField = ({
  handlerSubmit,
  handlerTyping,
  currentMessage,
}) => {
  const { t } = useTranslation();
  return (
    <div className="mt-auto px-5 py-3">
      <form onSubmit={handlerSubmit} className="py-1 border rounded-2">
        <div className="input-group">
          <input
            name="body"
            aria-label={t('messages.newMessage')}
            placeholder={t('messages.placeholder')}
            className="border-0 p-0 ps-2 form-control"
            onChange={handlerTyping}
            value={currentMessage}
          />
          <button
            type="submit"
            className="btn btn-group-vertical border-0"
            disabled={currentMessage.trim().length === 0}
          >
            <ReactSVG src={Arrow} />
            <span className="visually-hidden">{t('messages.send')}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInputField;
