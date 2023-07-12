import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../Providers/AuthProvider';
import { links } from '../../routes/routes';

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    logoutUser();
    navigate(links.login());
  };
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <NavLink className="navbar-brand" to={links.main()}>
          {t('navbar.title')}
        </NavLink>
        {user && (
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
