import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Form, Card } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../../Providers/AuthProvider';
import AuthWrap from '../../../wrapper/TabsAuthWrap';
import { apiRoutes, links } from '../../../routes/routes';

const SignUp = () => {
  const [isUserExist, setIsUserExist] = useState(false);
  const [sendingForm, setSendingForm] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const registerSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('errors.range'))
      .max(20, t('errors.range'))
      .required(t('errors.required')),
    password: Yup.string()
      .min(6, t('errors.rangePassword'))
      .required(t('errors.required')),
    confrimPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      t('errors.matchPassword'),
    ),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confrimPassword: '',
    },
    validationSchema: registerSchema,
    onSubmit: async (data) => {
      setIsUserExist(false);
      setSendingForm(true);
      try {
        const response = await axios.post(apiRoutes.signupPath(), data);
        const { token, username } = response.data;
        setUser(token, username);
        toast.success(t('notify.registration'));
        navigate(links.main());
      } catch (error) {
        setSendingForm(false);
        if (error.response.status === 409) {
          setIsUserExist(true);
          return;
        }

        if (error.isAxiosError) {
          toast.error(t('notify.networkError'));
        }
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
              name="username"
              id="username"
              className="form-control"
              placeholder={t('registerForm.login')}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.username}
              isInvalid={
                isUserExist || (formik.errors.username && formik.touched.username)
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
              id="password"
              className="form-control"
              placeholder={t('registerForm.password')}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              autoComplete="new-password"
              isInvalid={
                isUserExist || (formik.errors.password && formik.touched.password)
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
              placeholder={t('registerForm.confrimPassword')}
              onChange={formik.handleChange}
              value={formik.values.confrimPassword}
              autoComplete="new-password"
              isInvalid={
                isUserExist || formik.errors.confrimPassword
              }
            />
            <Form.Label htmlFor="confrimPassword">
              {t('registerForm.confrimPassword')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.confrimPassword ?? t('errors.userExist')}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            type="submit"
            disabled={sendingForm}
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
