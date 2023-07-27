import { useContext } from 'react';
import {
  Routes, Route, useLocation, Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {
  SignIn, SignUp, Main, PageNotFound,
} from './components';
import Navbar from './components/Navbar/Navbar';
import { AuthContext } from './components/Providers/AuthProvider';
import { links } from './routes/routes';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  return user ? (
    children
  ) : (
    <Navigate to={links.login()} state={{ from: location }} />
  );
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <Navbar />

    <Routes>
      <Route
        path={links.main()}
        element={(
          <PrivateRoute>
            <Main />
          </PrivateRoute>
        )}
      />
      <Route path={links.login()} element={<SignIn />} />
      <Route path={links.signup()} element={<SignUp />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </div>
);

export default App;
