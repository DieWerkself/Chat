import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { CirclesWithBar } from 'react-loader-spinner';
import axios from 'axios';
import {
  addChannels,
  channelsSelector,
  setActiveChannelId,
} from '../../store/channelsSlice';
import { addMessages, messagesSelector } from '../../store/messagesSlice';
import { AuthContext } from '../Providers/AuthProvider';
import Channels from './Channels/Channels';
import Chat from './MessagesSection/MessagesSection';
import AuthRedirect from '../../wrapper/AuthRedirect';
import { apiRoutes } from '../../routes/routes';

const ChatMain = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { userData } = useContext(AuthContext);
  const { t } = useTranslation();
  const channels = useSelector(channelsSelector.selectAll);
  const messages = useSelector(messagesSelector.selectAll);
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId,
  );

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(apiRoutes.dataPath(), {
          headers: { Authorization: `Bearer ${userData.getToken()}` },
        });
        const { data } = response;
        dispatch(addChannels(data.channels));
        dispatch(addMessages(data.messages));
        dispatch(setActiveChannelId(data.currentChannelId));
        setIsLoading(false);
      } catch (error) {
        if (error.isAxiosError) {
          toast.error(t('notify.networkError'));
        }
      }
    };
    getData();
  }, [dispatch, t]);

  const handleActiveChannelId = (id) => {
    dispatch(setActiveChannelId(id));
  };

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center h-100">
          <CirclesWithBar
            height="100"
            width="100"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible
            outerCircleColor=""
            innerCircleColor=""
            barColor=""
            ariaLabel="circles-with-bar-loading"
          />
        </div>
      ) : (
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <Channels
              channels={channels}
              handleChannelId={handleActiveChannelId}
              currentId={currentChannelId}
            />
            <Chat
              messages={messages}
              channels={channels}
              currentChannelId={currentChannelId}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AuthRedirect(ChatMain);
