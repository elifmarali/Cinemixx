import React from 'react';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import { useAddModalContext } from '@/context/AddFilmModal';
import AddFilmForm from '../AddFilmForm';

// Modal'ın ana elementini belirtiyoruz
Modal.setAppElement('#__next');

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1010,
    minWidth: '50vw',
    minHeight: '40vh',
    backgroundColor: '#a1a1a1',
    border: 'none',
    borderRadius: '10px',
  },
};

function AddFilmModal() {
  const { addModal, closeModal } = useAddModalContext();

  return (
    <Modal
      isOpen={addModal}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className='flex justify-end'>
        <IoClose onClick={closeModal} className='text-[2vw] cursor-pointer' />
      </div>
      <AddFilmForm />
    </Modal>
  );
}

export default AddFilmModal;
