import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

const currentPage = window.location.pathname.substring(1);

const AuthWrap = (Component) => () => {
  const [authPage, setAuthPage] = useState(currentPage);
  const { t } = useTranslation();

  const handlerActivePage = (e) => setAuthPage(e.target.id);

  const activeTab = cn({
    'nav-link': true,
    active: authPage === 'login',
    active: authPage === 'registration',
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <ul className="nav nav-tabs nav-fill">
            <li onClick={handlerActivePage} className="nav-item">
              <NavLink className={activeTab} id="login" to="/login">
                {t('authForm.login')}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                onClick={handlerActivePage}
                className={activeTab}
                id="register"
                to="/register"
              >
                {t('authForm.register')}
              </NavLink>
            </li>
          </ul>
          <Component />
        </div>
      </div>
    </div>
  );
};

export default AuthWrap;
