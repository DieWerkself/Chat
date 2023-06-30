import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Form, Card } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../../../App';
import AuthWrap from '../../../wrapper/AuthWrap';

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const SignIn = () => {
  const [isAuthFailed, setAuthFailed] = useState(false);
  const { setAuthUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (data) => {
      try {
        const response = await axios.post('/api/v1/login', data);
        const { token, username } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        setAuthFailed(false);
        setAuthUser(true);
        navigate('/');
      } catch (error) {
        setAuthFailed(true);
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
              type="username"
              id="username"
              className="form-control"
              placeholder="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              isInvalid={isAuthFailed}
            />
            <Form.Label htmlFor="username">{t('loginForm.login')}</Form.Label>
          </Form.Group>
          <Form.Group className="form-floating mb-4">
            <Form.Control
              name="password"
              type="password"
              id="Password"
              className="form-control"
              placeholder="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              isInvalid={isAuthFailed}
            />
            <Form.Label htmlFor="password">
              {t('loginForm.password')}
            </Form.Label>
            <Form.Control.Feedback type="invalid" tooltip>
              {t('loginForm.incorrect')}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            type="submit"
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
