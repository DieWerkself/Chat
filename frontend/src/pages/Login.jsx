import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form, Card } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  const [authFailed, setAuthFailed] = useState(false);

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      setAuthFailed(true);
    },
  });

  return (
    <div className="col-12 col-md-8 col-xxl-6">
      <ul className="nav nav-tabs nav-fill">
        <li className="nav-item">
          <a className="nav-link active" id="tab-login" href="#pills-login">
            Login
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="tab-register" href="#pills-register">
            Register
          </a>
        </li>
      </ul>
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
                isInvalid={authFailed}
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
                isInvalid={authFailed}
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
    </div>
  );
};

export default Login;
