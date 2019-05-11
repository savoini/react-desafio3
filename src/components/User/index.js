import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creators as GithubActions } from '../../store/redux/github';
import {
  Container, List, ListItem, Item, Avatar, Action,
} from './styles';

const User = ({ github, removeUserRequest }) => (
  <Container>
    <List>
      {github.data.map(user => (
        <ListItem key={user.id}>
          <Avatar src={user.avatar} alt={user.name}>
            <img src={user.avatar} alt={user.name} />
          </Avatar>
          <Item>
            <strong>{user.name}</strong>
            <span>{user.login}</span>
          </Item>
          <Action>
            <i
              className="fa fa-times-circle"
              aria-hidden="true"
              onClick={() => removeUserRequest(user.id)}
            />
          </Action>
        </ListItem>
      ))}
    </List>
  </Container>
);

User.propTypes = {
  removeUserRequest: PropTypes.func.isRequired,
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
)(User);
