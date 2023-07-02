import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../App';

const AuthRedirect = (Component) => () => {
  const { authUser } = useContext(AuthContext);
  const isUserAuth = () => authUser || localStorage.user;
  return (
    <>{!isUserAuth() ? <Navigate replace to="/login" /> : <Component />}</>
  );
};

export default AuthRedirect;
