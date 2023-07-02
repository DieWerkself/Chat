import React, { createContext, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './App';
import resources from './locales/index.js';
import { store } from './store/store';
import SocketProvider from './components/Providers/SocketProvider';
const AuthContext = createContext({});

const init = async (socket) => {
  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });

  return (
    // <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <SocketProvider socket={socket}>
            <App />
          </SocketProvider>
        </I18nextProvider>
      </Provider>
    </BrowserRouter>
    // </React.StrictMode>
  );
};

export default init;
