import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ImageUploader extends Component {
  constructor(props) {
    super(props);

    this.handleUpload = this.handleUpload.bind(this);
  }
  handleUpload(e) {
    let fileReader = new FileReader();
    let file = e.target.files[0];

    if (!file) {
      return;
    }

    fileReader.onload = (image) => {
      this.input.value = '';
      this.props.receiveImage(image.target.result);
    };

    fileReader.readAsDataURL(file);
  }
  render() {
    return (
      <input
        ref={(i) => { this.input = i }}
        type="file"
        accept="image/*"
        onChange={this.handleUpload}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          cursor: 'pointer',
          opacity: 0,
          zIndex: 15
        }}
      />
    )
  }
}

ImageUploader.propTypes = {
  receiveImage: PropTypes.func
};

ImageUploader.defaultProps = {
  receiveImage: (result) => { console.log(result); }
};

export default ImageUploader
