import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { getPage } from './redux/reducers';

class Body extends React.Component {
  static propTypes = {
    page: PropTypes.string
  };

  renderModal() {
    const { page } = this.props;
    return (
      <Modal>
      </Modal>
    );
  }

  render() {
    return (
      <div>
        { this.renderModal() }
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  page: getPage(state)
});

export default connect(mapStateToProps)(Body);

const style = {

};
