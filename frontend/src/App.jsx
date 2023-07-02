import { Routes, Route } from 'react-router-dom';
import { SignIn, SignUp, Main, PageNotFound } from './components';
import { createContext, useState } from 'react';
import Navbar from './components/Navbar/Navbar';

export const AuthContext = createContext();

const App = () => {
  const [authUser, setAuthUser] = useState(false);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      <div className="d-flex flex-column h-100">
        <Navbar />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
