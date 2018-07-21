import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import {getError, getLoginState, getPage} from './redux/reducers';
import { tryToLogin } from './redux/actions';
import { PAGES } from './redux/constants';

class LoginModal extends React.Component {
  static propTypes = {
    page: PropTypes.string,
    error: PropTypes.string
  };

  state = {
    username: '',
    password: ''
  };

  handleUserChange = (e) => this.setState({ username: e.target.value });
  handlePasswordChange = (e) => this.setState({ password: e.target.value });
  handleLogin = () => this.props.login({ username: this.state.username, password: this.state.password });

  render() {
    const { page, error } = this.props;
    const { username, password } = this.state;
    return (
      <Modal show={ page === PAGES.LOG_IN } style={ styles.container }>
        <Modal.Header>
          <h1>Log In</h1>
        </Modal.Header>
        <div style={ styles.innerContainer }>
          <input
            type='text'
            style={ styles.input }
            value={ username }
            onChange={ this.handleUserChange }
            placeholder={ 'SuperName' }
          />
          <input
            type='password'
            style={ styles.input }
            value={ password }
            onChange={ this.handlePasswordChange }
            placeholder={ 'Password' }
          />
          <Button bsStyle='primary' style={ styles.button } onClick={ this.handleLogin }>
            Log In
          </Button>
          { error && <label>Hatali giris yaptiniz!</label>}
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  page: getPage(state),
  error: getError(getLoginState(state))
});

const mapDispatchToProps = {
  login: tryToLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);

const styles = {
  container: {
    /*
    maxWidth: 480,
    minWidth: 240,
    */
    marginTop: '13vh',
    textAlign: 'center',
    padding: 60
  },
  innerContainer: {
    padding: 60
  },
  input: {
    width: '80%',
    fontSize: 24,
    padding: 20,
    borderRadius: 16,
    border: '1px solid #ddd',
    marginTop: 24
  },
  button: {
    width: '80%',
    borderRadius: 16,
    fontSize: 24,
    margin: '24px auto',
    padding: 20,
    display: 'block'
  }
};
