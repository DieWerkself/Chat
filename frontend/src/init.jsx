import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './App';
import resources from './locales/index.js';
import { store } from './store/store';
import SocketProvider from './components/Providers/SocketProvider';
import AuthProvider from './components/Providers/AuthProvider';

const init = async (socket) => {
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_TOKEN_ROLLBAR,
    environment: 'production',
  };

  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });

  return (
    <React.StrictMode>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <BrowserRouter>
            <Provider store={store}>
              <I18nextProvider i18n={i18n}>
                <AuthProvider>
                  <SocketProvider socket={socket}>
                    <App />
                  </SocketProvider>
                </AuthProvider>
              </I18nextProvider>
            </Provider>
          </BrowserRouter>
        </ErrorBoundary>
      </RollbarProvider>
    </React.StrictMode>
  );
};

export default init;
