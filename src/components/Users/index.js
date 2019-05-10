import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creators as GithubActions } from '../../store/redux/github';
import { Container } from './styles';

import User from '../User';

class Users extends Component {
  state = {
    userInput: '',
  };

  addUserHandle = (e) => {
    e.preventDefault();

    const { userInput } = this.state;
    const { addUserRequest } = this.props;

    addUserRequest(userInput);
    this.setState({ userInput: '' });
  };

  render() {
    const { userInput } = this.state;
    const { github } = this.props;

    return (
      <Container>
        <form onSubmit={this.addUserHandle}>
          <input
            type="text"
            value={userInput}
            onChange={e => this.setState({ userInput: e.target.value })}
          />
          <button type="submit">Cancelar</button>
          <button type="submit">Salvar</button>
        </form>
        <User users={github.data} />
      </Container>
    );
  }
}

Users.propTypes = {
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
)(Users);
