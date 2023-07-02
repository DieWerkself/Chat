import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { SocketContext } from '../../Providers/SocketProvider';

const ModalDeleteChannel = ({ id, onHide }) => {
  const { deleteChannel } = useContext(SocketContext);

  const handlerDeleteChannel = () => {
    deleteChannel(id);
    onHide();
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Удалить канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="danger" onClick={handlerDeleteChannel}>
          Удалить
        </Button>
      </Modal.Footer>
    </>
  );
};

export default ModalDeleteChannel;
