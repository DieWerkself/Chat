import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.user && JSON.parse(localStorage.user));

  const loginUser = (token, username) => {
    setUser({ token, username });
    localStorage.setItem('user', JSON.stringify({ token, username }));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const userData = {
    getToken: () => user.token,
    getUsername: () => user.username,
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
