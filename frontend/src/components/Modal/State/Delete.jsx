import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { SocketContext } from '../../Providers/SocketProvider';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const ModalDeleteChannel = ({ id, onHide }) => {
  const { deleteChannel } = useContext(SocketContext);
  const { t } = useTranslation();

  const handlerDeleteChannel = () => {
    try {
      deleteChannel(id);
      toast.success(t('notify.deleteChannel'));
      onHide();
    } catch {
      if (error.isAxiosError) {
        toast.error(t('notify.networkError'));
      }
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t('modals.delete')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.deleteConfrim')}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t('modals.buttonClose')}
        </Button>
        <Button variant="danger" onClick={handlerDeleteChannel}>
          {t('modals.buttonDelete')}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default ModalDeleteChannel;
