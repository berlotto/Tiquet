// Packages
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import propTypes from 'prop-types';
import cogoToast from 'cogo-toast';

// Project
import BoardsServices from '../../services/boardsService';
import './styles.scss';

// Declarations
Modal.setAppElement('#root')

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  }
}

const CreateBoardModal = ({
  onCreationSuccess,
  onCreationFailure,
  closeModal,
  isOpen
}) => {
  const { handleSubmit, register, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = ({ boardName }) => {
    const boardService = new BoardsServices();
    setIsLoading(true);

    boardService.createBoard(boardName)
      .then(({data}) => {
        setIsLoading(false);
        cogoToast.success(`${boardName} has been created 😊`, { position: 'bottom-right'});
        onCreationSuccess(data);
      })
      .catch((e) => { 
        cogoToast.error('Whoops, something happened.', { position: 'bottom-right'});
        onCreationFailure(e);
      })
  }

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={closeModal}
    >
      <div className="create-board-modal">
        <div className="create-board-modal__header">
          <h6>Create a new board</h6>
          <i 
            onClick={closeModal}
            className="fas fa-times create-board-modal__header-close"
          >
          </i>
        </div>
        <hr/>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input 
            name="boardName"
            className="form-control" 
            disabled={isLoading}
            ref={register({ required: "Required" })}
            placeholder="How should it be named?" />
          <button className="btn btn-success btn-block mt-3">Submit</button>
        </form>
      </div>
    </Modal>
  );
};

CreateBoardModal.propTypes = {
  onCreationSuccess: propTypes.func,
  onCreationFailure: propTypes.func,
  closeModal: propTypes.func,
  isOpen: propTypes.bool
}

CreateBoardModal.defaultProps = {
  onCreationFailure: () => {},
  onCreationSuccess: () => {},
  closeModal: () => {}
}

export default CreateBoardModal;