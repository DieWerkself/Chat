import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(false);

  const isUserAuth = () => authUser || localStorage.user;

  return (
    <AuthContext.Provider value={{ isUserAuth, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
