import React from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { open } from '../../../store/modalSlice';

const Channels = ({ channels, handleChannelId, currentId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleDataModal = (data) => {
    dispatch(open(data));
  };

  const renderChannels = () => {
    const channelsUnremovableList = channels
      .filter(({ removable }) => !removable)
      .map(({ id, name }) => {
        const channelButtonStyles = cn({
          'w-100': true,
          'rounded-0': true,
          'text-start': true,
          btn: true,
          'btn-secondary': currentId === id,
        });

        return (
          <li key={id} className="nav-item w-100">
            <button
              type="button"
              onClick={() => handleChannelId(id)}
              className={channelButtonStyles}
            >
              <span className="me-1">#</span>
              {name}
            </button>
          </li>
        );
      });

    const channelsRemovableList = channels
      .filter(({ removable }) => removable)
      .map(({ id, name }) => {
        const channelButtonStyles = cn({
          'w-100': true,
          'rounded-0': true,
          'text-start': true,
          'text-truncate': true,
          'btn-secondary': currentId === id,
        });

        const channelArrowStyles = cn({
          'flex-grow-0': true,
          'btn-secondary': currentId === id,
        });

        return (
          <li key={id} className="nav-item w-100">
            <Dropdown
              as={ButtonGroup}
              className="d-flex"
              onClick={() => handleChannelId(id)}
            >
              <Button variant="" className={channelButtonStyles}>
                <span className="me-1">#</span>
                {name}
              </Button>

              <Dropdown.Toggle
                split
                variant=""
                className={channelArrowStyles}
                id="dropdown-split-basic"
                title={name}
              >
                <span className="visually-hidden">
                  {t('channels.manageChannel')}
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => handleDataModal({ id, modalName: 'delete' })}
                  href="#"
                >
                  {t('channels.deleteChannel')}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleDataModal({ id, name, modalName: 'update' })}
                  href="#"
                >
                  {t('channels.renameChannel')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        );
      });

    return (
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channelsUnremovableList}
        {channelsRemovableList}
      </ul>
    );
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.title')}</b>
        <button
          type="button"
          onClick={() => handleDataModal({ modalName: 'add' })}
          className="p-0 text-primary btn btn-group-vertical"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      {renderChannels()}
    </div>
  );
};

export default Channels;
