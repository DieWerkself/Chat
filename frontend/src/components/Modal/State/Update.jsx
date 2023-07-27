import React, { useContext, useEffect, useRef } from 'react';
import filter from 'leo-profanity';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { channelsSelector } from '../../../store/channelsSlice';
import { SocketContext } from '../../Providers/SocketProvider';

const ModalUpdateChannel = ({ id, name, onHide }) => {
  const { renameChannel } = useContext(SocketContext);
  const channels = useSelector(channelsSelector.selectAll);
  const { t } = useTranslation();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const renameChannelSchema = Yup.object().shape({
    channelName: Yup.string()
      .required(t('errors.required'))
      .notOneOf(channels.map((channel) => channel.name), t('errors.uniqueChannel'))
      .min(3, t('errors.range'))
      .max(20, t('errors.range')),
  });

  const formik = useFormik({
    initialValues: {
      channelName: filter.clean(name),
    },
    validationSchema: renameChannelSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (data) => {
      try {
        renameChannel(id, data.channelName, (responseData) => {
          if (responseData === 'error') {
            toast.error(t('notify.networkError'));
          } else {
            toast.success(t('notify.renameChannel'));
          }
        });
        onHide();
      } catch (error) {
        toast.error(t('notify.networkError'));
      }
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t('modals.rename')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              ref={inputRef}
              className="mb-2"
              id="channelName"
              name="channelName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.channelName}
              isInvalid={
                formik.errors.channelName && formik.touched.channelName
              }
            />
            <Form.Label className="visually-hidden" htmlFor="channelName">
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

export default ModalUpdateChannel;
