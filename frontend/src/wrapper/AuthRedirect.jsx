import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../components/Providers/AuthProvider';

const AuthRedirect = (Component) => () => {
  const { isUserAuth } = useContext(AuthContext);
  return (
    <>{!isUserAuth() ? <Navigate replace to="/login" /> : <Component />}</>
  );
};

export default AuthRedirect;
