import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../Providers/AuthProvider';

const Navbar = () => {
  const { isUserAuth, setAuthUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setAuthUser(false);
    navigate('/login');
  };
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          {t('navbar.title')}
        </NavLink>
        {isUserAuth() && (
          <button
            type="button"
            onClick={handleLogout}
            className="btn btn-primary"
          >
            {t('navbar.logout')}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
