import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Form, Card } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../../../App';
import AuthWrap from '../../../wrapper/AuthWrap';

const SignUp = () => {
  return <div>Registration</div>;
};

export default AuthWrap(SignUp);
