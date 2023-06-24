import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <div className="d-flex flex-column h-100">
      <div>
        <NavLink to="/">Main</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Main />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
