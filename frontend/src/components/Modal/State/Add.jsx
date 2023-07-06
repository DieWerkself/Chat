import React, { useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { channelsSelector } from '../../../store/channelsSlice';
import { SocketContext } from '../../Providers/SocketProvider';

const ModalAddChannel = ({ onHide }) => {
  const { addNewChannel } = useContext(SocketContext);
  const channels = useSelector(channelsSelector.selectAll);
  const { t } = useTranslation();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const addChannelSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('errors.required'))
      .notOneOf(
        channels.map(({ name }) => name),
        t('errors.uniqueChannel'),
      )
      .min(3, t('errors.range'))
      .max(20, t('errors.range')),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: addChannelSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (data) => {
      try {
        addNewChannel(data.name);
        formik.resetForm();
        toast.success(t('notify.addChannel'));
        onHide();
      } catch (error) {
        if (error.isAxiosError) {
          toast.error(t('notify.networkError'));
        }
      }
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t('modals.add')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              className="mb-2"
              ref={inputRef}
              id="name"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={
                formik.errors.name && formik.touched.name
              }
            />
            <Form.Label className="visually-hidden" htmlFor="name">
              {t('modals.name')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.channelName}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button className="me-2" variant="secondary" onClick={onHide}>
                {t('modals.buttonCancel')}
              </Button>
              <Button type="submit" variant="primary">
                {t('modals.buttonSend')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default ModalAddChannel;
