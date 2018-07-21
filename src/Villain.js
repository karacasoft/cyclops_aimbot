import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Glyphicon } from 'react-bootstrap';
import RemoveIcon from 'react-icons/lib/md/highlight-remove';

import { getVillainById } from './redux/reducers';
import { tryToRemoveVillain } from './redux/actions';
import {URL} from './redux/fetch';

class Villain extends React.Component {
  static propTypes = {
    villainId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageid: PropTypes.number.isRequired,
    removeVillain: PropTypes.func.isRequired
  };

  handleRemove = () => {
    this.props.removeVillain({ id: this.props.villainId });
  };

  render() {
    const { name, description, imageid } = this.props;
    return (
      <div style={ styles.container }>
        <span style={ styles.left }>
          <img style={ styles.image } src={ `${URL}/images/${imageid}` } title={ name } alt={ name } />
        </span>
        <span style={ styles.right }>
          <a href='#' onClick={ this.handleRemove } style={ styles.removeButton }>
            <RemoveIcon style={ styles.removeButtonIcon }/>
          </a>
          <div style={ styles.title }>
            { name }
          </div>
          <div style={ styles.description }>
            { description }
          </div>
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state, { villainId }) => ({
  ...getVillainById(state, villainId)
});

const mapDispatchToProps = {
  removeVillain: tryToRemoveVillain
};

export default connect(mapStateToProps, mapDispatchToProps)(Villain);

const styles = {
  container: {
    maxHeight: 180,
    height: 'calc(5vw + 5vh)',
    minHeight: 90,
    maxWidth: 720,
    margin: '20px auto',
    position: 'relative',
    backgroundColor: '#ddd',
    borderRadius: 16,
    overflow: 'hidden',
    display: 'flex'
  },
  left: {
    height: '100%',
    maxWidth: 180,
    width: 'calc(5vw + 5vh)',
    minWidth: 90,
    flexShrink: 0
  },
  right: {
    overflowY: 'auto',
    margin: '4px 12px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  image: {
    height: '100%',
    width: '100%'
  },
  removeButton: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  removeButtonIcon: {
    width: 32,
    height: 32,
    color: 'red'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 16
  }
};
