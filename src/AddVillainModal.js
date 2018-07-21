import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

import { PAGES } from './redux/constants';
import {getError, getImageId, getImageState, getPage, getVillainAddState} from './redux/reducers';
import { closeAddVillainMenu, tryToAddVillain, tryToUploadImage } from './redux/actions';

class AddVillainModal extends React.Component {
  static propTypes = {
    page: PropTypes.string,
    imageId: PropTypes.int,
    imageState: PropTypes.shape(),
    addVillain: PropTypes.func,
    uploadImage: PropTypes.func,
    closePage: PropTypes.func,
    error: PropTypes.string
  };

  state = {
    file: '',
    image: '',
    villainName: '',
    villainDescription: '',
    villainMarkerId: ''
  };

  handleImageChange = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file,
        image: reader.result
      });
      console.run(this.props.uploadImage, { image: reader.result });
    };
    file && reader.readAsDataURL(file);
  };

  handleVillainNameChange = (e) =>
    this.setState({ villainName: e.target.value });

  handleVillainDescriptionChange = (e) =>
    this.setState({ villainDescription: e.target.value });

  handleAddVillain = () => {
    const { villainName, villainDescription, villainMarkerId } = this.state;
    const { imageId, addVillain } = this.props;
    addVillain({
      name: villainName, description: villainDescription, imageid: imageId, markerid: villainMarkerId || null
    });
  };

  handleClosePage = () => {
    this.props.closePage();
  };

  handleMarkerChange = (e) => {
    this.setState({ villainMarkerId: e.target.value });
  };

  render() {
    const { page, error } = this.props;
    const { image, villainName, villainDescription, villainMarkerId } = this.state;
    return (
      <Modal show={ page === PAGES.ADD_VILLAIN } style={ styles.container }>
        <div style={ styles.group }>
          <Modal.Header>
            <h1>Add Villain</h1>
          </Modal.Header>
          <div style={ styles.imageHolder }>
            <input type='file' onChange={ this.handleImageChange } style={ styles.imageInput } accept='image/*' />
            { image && <img src={ image } style={ styles.imagePreview } /> }
          </div>
          <input
            type='text'
            onChange={ this.handleVillainNameChange }
            style={ styles.inputName }
            value={ villainName }
            placeholder={ 'Villain Name' }
          />
          <textarea
            onChange={ this.handleVillainDescriptionChange }
            placeholder={ 'Villain Description' }
            style={ styles.inputDescription }
            rows={ 4 }
            value={ villainDescription }
          >
          </textarea>
          <label> Face Recognition ID:</label>
          <select value={ villainMarkerId } onChange={ this.handleMarkerChange } style={ styles.markerSelect }>
            <option> </option>
            { [
              1,
              2,
              3,
              4,
              5,
              6
            ].map((elem) => <option key={ elem } value={ elem }>{ elem }</option>) }
          </select>
          <label> (Currently, only the marker id) </label>
          <br />
          <label>Omit this field to prevent the villain to synchronize with Cyclops'App.</label>
          { error && <label>Hata: { error.toString() }</label>}
          <Modal.Footer>
            <Button bsStyle='primary' onClick={ this.handleAddVillain }>
              Add Villain
            </Button>
            <Button bsStyle='danger' onClick={ this.handleClosePage }>
              Cancel
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  page: getPage(state),
  imageId: getImageId(state),
  imageState: getImageState(state),
  error: getError(getVillainAddState(state))
});

const mapDispatchToProps = {
  addVillain: tryToAddVillain,
  uploadImage: tryToUploadImage,
  closePage: closeAddVillainMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(AddVillainModal);

const styles = {
  container: {
    marginTop: '0vh',
    paddingTop: '12vh',
    textAlign: 'center'

  },
  group: {
    padding: 60,
    backgroundColor: 'rgb(188,141,31)',
    borderRadius: 4
  },
  imageHolder: {
    maxWidth: 180,
    width: '20vh',
    minWidth: 90,
    maxHeight: 180,
    height: '20vh',
    minHeight: 90,
    position: 'relative',
    overflow: 'hidden',
    margin: 'auto'
  },
  imageInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    fontSize: 0,
    width: 'calc(100% - 2px)',
    height: 'calc(100% - 2px',
    margin: 1,
    border: '1px dashed #444'
  },
  imagePreview: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%'
  },
  inputName: {
    display: 'block',
    margin: 'auto',
    width: '100%',
    fontSize: 24,
    padding: '16px 20px',
    borderRadius: 16,
    border: '1px solid #ddd',
    marginTop: 24

  },
  inputDescription: {
    display: 'block',
    margin: 'auto',
    width: '100%',
    borderRadius: 16,
    fontSize: 18,
    padding: '8px 12px',
    border: '1px solid #ddd',
    marginTop: 24,
    resize: 'none'
  },
  markerSelect: {
    marginTop: 20,
    margin: 8,
    padding: 4
  }
};
