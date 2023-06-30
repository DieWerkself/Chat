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

      <AuthContext.Provider value={{ authUser, setAuthUser }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
