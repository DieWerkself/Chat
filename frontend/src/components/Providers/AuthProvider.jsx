import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(false);

  const isUserAuth = () => authUser || localStorage.user;
  const parseLocalData = () => JSON.parse(localStorage.user);

  const setUser = (token, username) => {
    setAuthUser(true);
    localStorage.setItem('user', JSON.stringify({ token, username }));
  };

  const logoutUser = () => {
    setAuthUser(false);
    localStorage.removeItem('user');
  };

  const localData = {
    getToken: () => parseLocalData().token,
    getUsername: () => parseLocalData().username,
  };

  return (
    <AuthContext.Provider
      value={{
        isUserAuth,
        setUser,
        logoutUser,
        localData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
