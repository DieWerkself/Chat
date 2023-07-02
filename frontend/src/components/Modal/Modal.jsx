import React from 'react';
import ModalAddChannel from './State/Add';
import ModalDeleteChannel from './State/Delete';
import ModalUpdateChannel from './State/Update';
import { useDispatch, useSelector } from 'react-redux';
import { close } from '../../store/modalSlice';
import Modal from 'react-bootstrap/Modal';

const openModal = () => {
  const modalData = useSelector((state) => state.modal.data);
  const modalName = useSelector((state) => state.modal.data.modalName);
  const isModalShow = useSelector((state) => state.modal.isModalShow);
  const dispatch = useDispatch();

  const modals = {
    add: ModalAddChannel,
    delete: ModalDeleteChannel,
    update: ModalUpdateChannel,
  };

  const onHide = () => {
    dispatch(close());
  };

  const CurrentModal = modals[modalName];

  return (
    <>
      {isModalShow && (
        <Modal
          show={isModalShow}
          onHide={onHide}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <CurrentModal {...modalData} onHide={onHide} />
        </Modal>
      )}
    </>
  );
};

export default openModal;
