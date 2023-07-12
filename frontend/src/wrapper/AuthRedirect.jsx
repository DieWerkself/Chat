import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../components/Providers/AuthProvider';
import { links } from '../routes/routes';

const AuthRedirect = (Component) => function HOC() {
  const { user } = useContext(AuthContext);
  return (
    <>{!user ? <Navigate replace to={links.login()} /> : <Component />}</>
  );
};

export default AuthRedirect;
