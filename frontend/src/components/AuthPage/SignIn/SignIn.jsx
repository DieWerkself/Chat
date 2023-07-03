import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Form, Card } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AuthWrap from '../../../wrapper/AuthTabsWrap';
import { AuthContext } from '../../Providers/AuthProvider';
import apiRoutes from '../../../routes/routes';

const SignIn = () => {
  const [isAuthFailed, setAuthFailed] = useState(false);
  const [sendingForm, setSendingForm] = useState(false);
  const { setAuthUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const loginSchema = Yup.object().shape({
    username: Yup.string().required(t('errors.required')),
    password: Yup.string().required(t('errors.required')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (data) => {
      setSendingForm(true);
      try {
        const response = await axios.post(apiRoutes.loginPath(), data);
        const { token, username } = response.data;
        localStorage.setItem('user', JSON.stringify({ token, username }));
        toast.success(t('notify.login'));
        setAuthFailed(false);
        setAuthUser(true);
        navigate('/');
      } catch (error) {
        if (error.isAxiosError && error.response.status !== 401) {
          toast.error(t('notify.networkError'));
        }
        setAuthFailed(true);
        setSendingForm(false);
      }
    },
  });

  return (
    <Card className="border-top-0 rounded-0 rounded-bottom">
      <Card.Body className="row p-3">
        <Form className="col-12 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
          <h1 className="text-center mb-4">{t('loginForm.title')}</h1>
          <Form.Group className="form-floating mb-4">
            <Form.Control
              name="username"
              type="login"
              id="username"
              className="form-control"
              placeholder={t('loginForm.login')}
              onChange={formik.handleChange}
              value={formik.values.username}
              isInvalid={isAuthFailed}
              autoComplete="username"
              autoFocus
            />
            <Form.Label htmlFor="username">{t('loginForm.login')}</Form.Label>
          </Form.Group>
          <Form.Group className="form-floating mb-4">
            <Form.Control
              name="password"
              type="password"
              id="password"
              className="form-control"
              placeholder={t('loginForm.password')}
              onChange={formik.handleChange}
              value={formik.values.password}
              isInvalid={isAuthFailed}
              autoComplete="current-password"
            />
            <Form.Label htmlFor="password">
              {t('loginForm.password')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {t('errors.login')}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            type="submit"
            disabled={sendingForm}
            className="w-100 mb-3"
            variant="outline-primary"
            style={{ height: 50 }}
          >
            {t('loginForm.send')}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AuthWrap(SignIn);
