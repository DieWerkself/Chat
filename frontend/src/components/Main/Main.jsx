import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CirclesWithBar } from 'react-loader-spinner';
import { AuthContext } from '../../App';
import axios from 'axios';
import {
  addChannels,
  channelsSelector,
  setActiveChannelId,
} from '../../store/channelsSlice';
import { addMessages, messagesSelector } from '../../store/messagesSlice';
import Channels from './Channels/Channels';
import Chat from './Chat/Chat';
import AuthRedirect from '../../wrapper/AuthRedirect';

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelector.selectAll);
  const messages = useSelector(messagesSelector.selectAll);
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId
  );

  useEffect(() => {
    const getData = async () => {
      const token = JSON.parse(localStorage.user).token;
      try {
        const res = await axios.get('/api/v1/data', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data);
        dispatch(addChannels(res.data.channels));
        dispatch(addMessages(res.data.messages));
        dispatch(setActiveChannelId(res.data.currentChannelId));
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

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
            visible={true}
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

export default AuthRedirect(Main);
