import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { forEach, map, sumBy, bind, debounce, has } from 'lodash';

import ImageCropper from '../ImageCropper';

class PhotoLayers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedImages: [],
    };

    this.handleImageLoaded = this.handleImageLoaded.bind(this);
    this.handleImageReady = this.handleImageReady.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.templateAreas.length !== this.props.templateAreas.length) {
      this.props.setAllImagesLoaded(false);
      this.setState({ loadedImages: [] });
    }
  }
  handleImageLoaded(imageUrl) {
    // console.log('PhotoLayers handleImageLoaded: ' + imageUrl);
    let { loadedImages } = this.state;
    let { templateAreas } = this.props;

    if (loadedImages.indexOf(imageUrl) === -1) {
      loadedImages.push(imageUrl);
    }
    if (loadedImages.length === templateAreas.length) {
      this.props.setAllImagesLoaded(true);
    }
    this.setState({ loadedImages });
  }
  handleImageReady(canvas, x, y, width, height, scale, areaId, imageKey) {
    // console.log('PhotoLayers handleImageReady, areaId: ' + areaId + ', imageKey: ' + imageKey);
    this.props.loadMaskedImage({
      src: canvas.toDataURL('image/png'),
      x,
      y,
      width,
      height,
      scale,
      areaId,
      imageKey,
    });
  }
  render() {
    const {
      templateWidth,
      templateHeight,
      allImagesLoaded,
      images,
      templateAreas
    } = this.props;

    return (
      <div id="photo-layers">
        <div
          style={{
            position: 'absolute',
            width: `${templateWidth}px`,
            height: `${templateHeight}px`,
            display: 'block'
          }}
        >
          { map(templateAreas, (area, index) => {
            return (
              <ImageCropper
                id={`area-${index}`}
                className="canvas"
                allImagesLoaded={allImagesLoaded}
                areaId={index}
                key={`image-cropper-${index}`}
                ref={`image-cropper-${index}`}
                image={images[index]}
                width={area.width}
                height={area.height}
                border={0}
                color={[255, 255, 255, 0.6]}
                rotate={0}
                x={area.x}
                y={area.y}
                handleImageReady={this.handleImageReady}
                onLoadSuccess={
                  (info) => this.handleImageLoaded(info)
                }
                isDragging={this.props.isDragging}
                style={{
                  position: 'absolute',
                  width: `${area.width}px`,
                  height: `${area.height}px`,
                  left: `${area.x}px`,
                  top: `${area.y}px`,
                }}
              />
            );
          })
          }
        </div>
      </div>
    );
  }
}

PhotoLayers.propTypes = {
  templateImage: PropTypes.string,
  images: PropTypes.array,
  isDragging: PropTypes.bool,
  allImagesLoaded: PropTypes.bool,
};

PhotoLayers.defaultProps = {
  isDragging: false,
  allImagesLoaded: false,
};

export default PhotoLayers
