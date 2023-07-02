import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Form, Card } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../../../App';
import AuthWrap from '../../../wrapper/AuthTabsWrap';

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'Не менее 6 символов')
    .required('Обязательное поле'),
  confrimPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Пароли должны совпадать'
  ),
});

const SignUp = () => {
  const [isUserExist, setIsUserExist] = useState(false);
  const { setAuthUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confrimPassword: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (data) => {
      setIsUserExist(false);
      try {
        const response = await axios.post('/api/v1/signup', data);
        console.log(response);
        const { token, username } = response.data;
        localStorage.setItem('user', JSON.stringify({ token, username }));
        setAuthUser(true);
        navigate('/');
      } catch (error) {
        console.log(error);
        if (error.response.status === 409) {
          setIsUserExist(true);
        }
        // setAuthFailed(true);
      }
    },
  });

  return (
    <Card className="border-top-0 rounded-0 rounded-bottom">
      <Card.Body className="row p-3">
        <Form className="col-12 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
          <h1 className="text-center mb-4">{t('registerForm.title')}</h1>
          <Form.Group className="form-floating mb-4">
            <Form.Control
              type="username"
              id="username"
              className="form-control"
              placeholder="username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.username}
              isInvalid={
                isUserExist ||
                (formik.errors.username && formik.touched.username)
              }
              autoComplete="username"
              autoFocus
            />
            <Form.Label htmlFor="username">
              {t('registerForm.login')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="form-floating mb-4">
            <Form.Control
              name="password"
              type="password"
              id="Password"
              className="form-control"
              placeholder="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              autoComplete="new-password"
              isInvalid={
                isUserExist ||
                (formik.errors.password && formik.touched.password)
              }
            />
            <Form.Label htmlFor="password">
              {t('registerForm.password')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="form-floating mb-4">
            <Form.Control
              name="confrimPassword"
              type="password"
              id="confrimPassword"
              className="form-control"
              placeholder="confrimPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.confrimPassword}
              autoComplete="new-password"
              isInvalid={
                isUserExist ||
                (formik.errors.confrimPassword &&
                  formik.touched.confrimPassword)
              }
            />
            <Form.Label htmlFor="password">
              {t('registerForm.confrimPassword')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.confrimPassword ??
                'Такой пользователь уже существует'}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            type="submit"
            disabled={
              formik.errors.confrimPassword ||
              !formik.values.confrimPassword ||
              formik.errors.password ||
              !formik.values.password ||
              formik.errors.username ||
              !formik.values.username
            }
            className="w-100 mb-3"
            variant="outline-primary"
            style={{ height: 50 }}
          >
            {t('registerForm.send')}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AuthWrap(SignUp);
