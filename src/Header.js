import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Label } from 'react-bootstrap';
import logo from './logo.jpeg';

import FaPlus from 'react-icons/lib/fa/plus';

import { getPage, getUser } from './redux/reducers';
import { PAGES } from './redux/constants';
import { openAddVillainMenu } from './redux/actions';

class Header extends React.Component {
  static propTypes = {
    user: PropTypes.string,
    page: PropTypes.string.isRequired,
    openPage: PropTypes.func.isRequired
  };

  renderLeftIcon = () => {
    return (
      <img src={ logo } style={ styles.button } />
    );
  };

  renderMiddleIcon = () => {
    const { user, page } = this.props;
    if (user) {
      return (
        <h2 style={ styles.location }>
          {page === PAGES.VILLAINS ? 'LIST OF VILLAINS' : page}
        </h2>
      );
    }
    return (
      <h2 style={ styles.location }>
        VillainDB
      </h2>
    );
  };

  renderRightIcon = () => {
    const { page } = this.props;
    if (page !== PAGES.LOG_IN) {
      return (
        <Button bsStyle='danger' style={ styles.button } onClick={ this.props.openPage }>
          <FaPlus style={ styles.buttonPlus } />
        </Button>
      );
    }
    return null;
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

const mapDispatchToProps = {
  openPage: openAddVillainMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

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
    maxHeight: 100,
    height: '8vh',
    minHeight: 40,
    padding: 16,
    borderRadius: 18,
    fontSize: '4vh',
    marginRight: 4,
    marginLeft: 4,
    color: '#fff'
  },
  button: {
    maxWidth: 100,
    width: '8vh',
    minWidth: 40,
    maxHeight: 100,
    height: '8vh',
    minHeight: 40,
    borderRadius: '50%',
    fontSize: 48
  },
  buttonPlus: {
    verticalAlign: 'text-top'
  }

};
