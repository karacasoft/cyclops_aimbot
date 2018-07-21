import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Label } from 'react-bootstrap';

import { getPage, getUser } from './redux/reducers';

class Header extends React.Component {
  static propTypes = {
    user: PropTypes.string,
    page: PropTypes.string.isRequired
  };

  renderLeftIcon = () => {
    return (
      <Button bsStyle='info' style={styles.button}>
        Very Button
      </Button>
    );
  };

  renderMiddleIcon = () => {
    const { user, page } = this.props;
    const bsStyle = user ? 'primary' : 'warning';
    return (
      <Label bsStyle={ console.debug('primary') } style={styles.location}>
        { console.debug(page) }
      </Label>
    );
  };

  renderRightIcon = () => {
    return (
      <Button bsStyle='success' style={styles.button}>
        Kuul Button
      </Button>
    );
  };

  render() {
    return (
      <div style={ styles.container }>
        { this.renderLeftIcon() }
        { this.renderMiddleIcon() }
        { this.renderRightIcon() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: getUser(state),
  page: getPage(state)
});

export default connect(mapStateToProps)(Header);

const styles = {
  container: {
    maxHeight: 144,
    height: '13vh',
    minHeight: 72,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '20px 2vw',
    backgroundColor: '#ffa1a1'
  },
  location: {
    maxWidth: 360,
    width: '40vh',
    minWidth: 160,
    maxHeight: 100,
    height: '8vh',
    minHeight: 40,
    padding: 16,
    borderRadius: 18,
    fontSize: '4vh',
    marginRight: 4,
    marginLeft: 4
  },
  button: {
    maxWidth: 100,
    width: '8vh',
    minWidth: 40,
    maxHeight: 100,
    height: '8vh',
    minHeight: 40,
    borderRadius: '50%'
  }

};
