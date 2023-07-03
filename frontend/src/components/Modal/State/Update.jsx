import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { channelsSelector } from '../../../store/channelsSlice';
import { SocketContext } from '../../Providers/SocketProvider';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const ModalUpdateChannel = ({ id, name, onHide }) => {
  const { renameChannel } = useContext(SocketContext);
  const channels = useSelector(channelsSelector.selectAll);
  const { t } = useTranslation();

  const renameChannelSchema = Yup.object().shape({
    channelName: Yup.string()
      .required('errors.required')
      .notOneOf(channels.map(({ name }) => name))
      .min(3, 'errors.rangeLetter')
      .max(20, 'errors.rangeLetter'),
  });

  const formik = useFormik({
    initialValues: {
      channelName: name,
    },
    validationSchema: renameChannelSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (data) => {
      try {
        renameChannel(id, data.channelName);
        toast.success(t('notify.renameChannel'));
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
          {t('modals.rename')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              className="mb-2"
              id="channelName"
              name="channelName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.channelName}
              isInvalid={
                formik.errors.channelName && formik.touched.channelName
              }
              autoFocus
            />
            <Form.Label hidden htmlFor="channelName">
              {t('modals.rename')}
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
