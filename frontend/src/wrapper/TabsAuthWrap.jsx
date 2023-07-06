/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { links } from '../routes/routes';

const currentPage = window.location.pathname.substring(1);

const TabsAuthWrap = (Component) => function HOC() {
  const [authPage, setAuthPage] = useState(currentPage);
  const { t } = useTranslation();

  const handlerActivePage = (e) => setAuthPage(e.target.id);

  const activeLoginTab = cn({
    'nav-item': true,
    active: authPage === 'login',
  });

  const activeSignupTab = cn({
    'nav-item': true,
    active: authPage === 'signup',
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <ul className="nav nav-tabs nav-fill">
            <li onClick={handlerActivePage} className={activeLoginTab}>
              <NavLink className="nav-link" id="login" to={links.login()}>
                {t('loginForm.title')}
              </NavLink>
            </li>
            <li className={activeSignupTab}>
              <NavLink
                onClick={handlerActivePage}
                className="nav-link"
                id="signup"
                to={links.signup()}
              >
                {t('registerForm.title')}
              </NavLink>
            </li>
          </ul>
          <Component />
        </div>
      </div>
    </div>
  );
};

export default TabsAuthWrap;
