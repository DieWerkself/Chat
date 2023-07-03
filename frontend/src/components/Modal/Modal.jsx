import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import ModalAddChannel from './State/Add';
import ModalDeleteChannel from './State/Delete';
import ModalUpdateChannel from './State/Update';
import { close } from '../../store/modalSlice';

const OpenModal = () => {
  const { data, isModalShow } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const modals = {
    add: ModalAddChannel,
    delete: ModalDeleteChannel,
    update: ModalUpdateChannel,
  };

  const onHide = () => {
    dispatch(close());
  };

  const CurrentModal = modals[data.modalName];

  return (
    <Modal
      show={isModalShow}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {isModalShow && <CurrentModal {...data} onHide={onHide} />}
    </Modal>
  );
};

export default OpenModal;
