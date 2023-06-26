import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { SignIn, SignUp, Main, PageNotFound } from './components';
import { createContext, useState } from 'react';

export const AuthContext = createContext();

const App = () => {
  const [authUser, setAuthUser] = useState(false);

  return (
    <div className="d-flex flex-column h-100">
      <div>
        <NavLink to="/">Main</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <AuthContext.Provider value={{ authUser, setAuthUser }}>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </AuthContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default App;
