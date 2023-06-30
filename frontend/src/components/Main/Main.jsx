import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import axios from 'axios';
import { addChannels, setActiveChannelId } from '../../store/channelsSlice';
import { addMessages } from '../../store/messagesSlice';
import Channels from './Channels/Channels';
import Chat from './Chat/Chat';

const Main = () => {
  const [currentChannelName, setCurrentChannelName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { authUser } = useContext(AuthContext);
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const messages = useSelector((state) => state.messages.messages);
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId
  );

  const isUserAuth = () => authUser || localStorage.token;

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('/api/v1/data', {
          headers: { Authorization: `Bearer ${localStorage.token}` },
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

  useEffect(() => {
    const channel = channels.find(({ id }) => id === currentChannelId);
    setCurrentChannelName(channel?.name);
  }, [currentChannelId]);

  const handleActiveChannelId = (id) => {
    dispatch(setActiveChannelId(id));
  };

  if (!isUserAuth()) {
    return <Navigate replace to="/login" />;
  } else {
    return (
      <>
        {isLoading ? (
          <></>
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
                channelName={currentChannelName}
                currentChannelId={currentChannelId}
              />
            </div>
          </div>
        )}
      </>
    );
  }
};

export default Main;
