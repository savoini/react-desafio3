import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';

import { Creators as ModalActions } from '../../store/redux/modal';
import { Creators as MapaActions } from '../../store/redux/mapa';
import { Creators as GithubActions } from '../../store/redux/github';

import './styles.css';

Modal.setAppElement(document.getElementById('root'));

class Search extends Component {
  state = {
    userInput: '',
  };

  addUserHandle = (e) => {
    e.preventDefault();

    const { userInput } = this.state;
    const { addUserRequest } = this.props;

    addUserRequest(userInput);
    this.clearInput();
  };

  closeModal = () => {
    const { clearPoint } = this.props;
    clearPoint();
    this.clearInput();
  };

  clearInput = () => {
    const { closeModal } = this.props;
    closeModal();
    this.setState({ userInput: '' });
  };

  render() {
    const { userInput } = this.state;
    const { modal } = this.props;

    return (
      <Modal
        isOpen={modal.open}
        onRequestClose={this.closeModal}
        contentLabel="Add User Modal"
        className="modal-container"
        overlayClassName="modal-overlay"
      >
        <h2>Adicionar novo usuário</h2>
        <form onSubmit={this.addUserHandle} className="form">
          <input
            placeholder="Usuário do Github"
            value={userInput}
            onChange={e => this.setState({ userInput: e.target.value })}
          />
          <div className="buttons-container">
            <button type="button" onClick={this.closeModal}>
              Cancelar
            </button>
            <button type="submit">Salvar</button>
          </div>
        </form>
      </Modal>
    );
  }
}

Search.propTypes = {
  closeModal: PropTypes.func.isRequired,
  clearPoint: PropTypes.func.isRequired,
  addUserRequest: PropTypes.func.isRequired,
  modal: PropTypes.shape({
    open: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = state => ({
  github: state.github,
  modal: state.modal,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...GithubActions,
    ...ModalActions,
    ...MapaActions,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
