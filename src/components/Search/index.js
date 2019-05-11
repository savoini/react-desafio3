import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creators as GithubActions } from '../../store/redux/github';
import { Container } from './styles';

class Search extends Component {
  state = {
    userInput: '',
  };

  addUserHandle = (e) => {
    e.preventDefault();

    const { userInput } = this.state;
    const { addUserRequest } = this.props;

    addUserRequest(userInput);
  };

  render() {
    const { userInput } = this.state;
    const { github } = this.props;

    return (
      <Container>
        Adicionar novo Usuário
        <form onSubmit={this.addUserHandle}>
          <input
            type="text"
            value={userInput}
            className="form-control"
            onChange={e => this.setState({ userInput: e.target.value })}
          />
          <button type="submit" className="btn btn-light">
            Cancelar
          </button>
          <button type="submit" className="btn btn-success">
            Salvar
          </button>
        </form>
        <ul>
          {github.data.map(user => (
            <li key={user.id}>
              {user.name} - {user.location}
            </li>
          ))}
        </ul>

      </Container>
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
        <button onClick={this.closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    );
  }
}

Search.propTypes = {
  addUserRequest: PropTypes.func.isRequired,
  github: PropTypes.shape({
    loading: PropTypes.bool,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        location: PropTypes.string,
        avatar: PropTypes.string,
      }),
    ),
    error: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  github: state.github,
});

const mapDispatchToProps = dispatch => bindActionCreators(GithubActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
