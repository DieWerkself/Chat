import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../App';

const Main = () => {
  const { authUser } = useContext(AuthContext);

  const isUserAuth = () => authUser || localStorage.token;

  return (
    <>{!isUserAuth() ? <Navigate replace to="/login" /> : <div>Main</div>}</>
  );
};

export default Main;
