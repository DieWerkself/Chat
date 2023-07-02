import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';

const Navbar = () => {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const isUserAuth = () => authUser || localStorage.user;

  const handleLogout = () => {
    localStorage.removeItem('user');
    setAuthUser(false);
    navigate('/login');
  };
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Hexlet Chat
        </NavLink>
        {/* <NavLink to="/login">Login</NavLink> */}
        {isUserAuth() && (
          <button
            type="button"
            onClick={handleLogout}
            className="btn btn-primary"
          >
            Выйти
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
