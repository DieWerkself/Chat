import React, { createContext, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './App';
import resources from './locales/index.js';
const AuthContext = createContext({});

const init = async () => {
  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });

  return (
    <React.StrictMode>
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <AuthContext.Provider value={''}>
            <App />
          </AuthContext.Provider>
        </I18nextProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default init;
