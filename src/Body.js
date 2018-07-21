import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPage, getVillainIds, getVillainsLoadState, isLoaded, isLoading, getError } from './redux/reducers';
import { PAGES } from './redux/constants';
import LoginModal from './LoginModal';
import AddVillainModal from './AddVillainModal';
import Villain from './Villain';
import { tryToGetVillains } from './redux/actions';

class Body extends React.Component {
  static propTypes = {
    page: PropTypes.string.isRequired,
    villainIds: PropTypes.arrayOf(PropTypes.number.isRequired),
    loadState: PropTypes.shape().isRequired,
    getVillains: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const { page, loadState, getVillains } = this.props;
    if (page === PAGES.VILLAINS && !isLoaded(loadState) && !isLoading(loadState) && !getError(loadState)) {
      getVillains();
    }
  }

  renderVillains() {
    const { page, villainIds } = this.props;
    if (page === PAGES.LOG_IN) {
      return null;
    }
    return (
      villainIds.map((id) => <Villain key={ id } villainId={ id } />)
    );
  }

  render() {
    return (
      <div style={ styles.container }>
        { this.renderVillains() }
        <LoginModal />
        <AddVillainModal />
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  page: getPage(state),
  villainIds: getVillainIds(state),
  loadState: getVillainsLoadState(state)
});

const mapDispatchToProps = {
  getVillains: tryToGetVillains
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);

const styles = {
  container: {
    overflowY: 'auto'
  }

};
