import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CollagePreview.css';
import { has, forEach, keys, values, includes } from 'lodash';

class CollagePreview extends Component {
  constructor(props) {
    super(props);

    this.drawMaskedImages = this.drawMaskedImages.bind(this);
    this.drawTemplateOverlay = this.drawTemplateOverlay.bind(this);
    this.generateCollage = this.generateCollage.bind(this);
  }
  componentDidMount() {
    // console.log('CollagePreview componentDidMount, this.props:');
    // console.log(this.props);
    if (this.tempCanvas) {
      this.tempCtx = this.tempCanvas.getContext('2d');
    }
    if (keys(this.props.maskedImages).length > 0) {
      this.drawMaskedImages(this.props.maskedImages);
    }
  }
  componentWillReceiveProps(nextProps) {
    // console.log('CollagePreview componentWillReceiveProps, nextProps:');
    // console.log(nextProps);
    let { maskedImages } = nextProps;

    if (keys(maskedImages).length > 0) {
      this.drawMaskedImages(nextProps.maskedImages);
    }
  }
  drawMaskedImages(maskedImages) {
    let { drawnImages } = this.props;
    /*console.log('CollagePreview drawMaskedImages, maskedImages:');
    console.log(maskedImages);
    console.log('drawnImages:');
    console.log(drawnImages);*/

    forEach(maskedImages, (maskedImage, areaId) => {
      let imageKey = maskedImage.imageKey;
      if (!has(drawnImages, areaId) || !includes(values(drawnImages), imageKey)) {
        // console.log('drawing maskedImage with imageKey: ' + imageKey);
        let image = new Image();
        image.onload = () => {
          this.tempCtx.drawImage(image, maskedImage.x, maskedImage.y);
          this.props.handleMaskedImageDrawn(areaId, imageKey);
        };
        image.src = maskedImage.src;
      }
    });
  }
  drawTemplateOverlay() {
    return new Promise((resolve) => {
      this.tempCtx.drawImage(this.props.templateOverlay, 0, 0);
      let newImg = document.createElement('img');

      this.tempCanvas.toBlob((blob) => {
        let url = URL.createObjectURL(blob);

        newImg.onload = function() {
          setTimeout(function() {
            URL.revokeObjectURL(url);
          }, 1000);

          resolve({ collageImage: url });
        };

        newImg.src = url;
      });
    });
  }
  generateCollage() {
    let { maskedImages, templateOverlay } = this.props;
    if (keys(maskedImages).length === 0 || !templateOverlay) {
      return;
    }
    this.drawTemplateOverlay().then(({ collageImage }) => {
      window.open(collageImage);
    });
  }
  render() {
    const { templateWidth, templateHeight } = this.props;

    return (
      <div>
        <button
          onClick={this.generateCollage.bind(this)}
          className={s.generateButton}
        >
          Generate Collage Image
        </button>
        <canvas
          ref={(c) => this.tempCanvas = c}
          width={templateWidth}
          height={templateHeight}
          style={{display: 'none'}}
        />
      </div>
    )
  }
}

CollagePreview.propTypes = {
  maskedImages: PropTypes.object,
};

CollagePreview.defaultProps = {
  maskedImages: {},
  templateOverlay: false,
};

export default withStyles(s)(CollagePreview);