import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map, uniq, merge } from 'lodash';

class ImageToolbar extends Component {
  render() {
    const { images, lastX, lastY, lastImageIndex, dragImageSize } = this.props;

    const photoToolbarStyle = {
      position: 'relative',
      width: `${images.length * dragImageSize}px`,
      height: `${dragImageSize}px`,
      zIndex: 2,
    };
    const dragImageWrapStyle = {
      width: `${dragImageSize}px`,
      height: `${dragImageSize}px`,
      display: 'inline-block',
      userSelect: 'none',
      cursor: 'move',
    };
    const dragImageStyle = {
      maxWidth: '100%',
      maxHeight: '100%',
      pointerEvents: 'none',
    };

    return (
      <div className="image-toolbar" style={photoToolbarStyle}>
        {
          map(uniq(images), (imageUrl, index) => {
            let activeImageStyle = {
              left: `${lastX}px`,
              top: `${lastY}px`,
              position: 'absolute',
            };
            let imageStyle = lastImageIndex === index ? merge({}, dragImageWrapStyle, activeImageStyle) : dragImageWrapStyle;
            return (
              <div
                key={`draggable-image-${imageUrl}-${index}`}
                data-index={index}
                className="draggable-image"
                style={imageStyle}
              >
                <img src={imageUrl} style={dragImageStyle}/>
              </div>
            )
          })
        }
      </div>
    );
  }
}

ImageToolbar.propTypes = {
  images: PropTypes.array.isRequired,
  lastX: PropTypes.number,
  lastY: PropTypes.number,
  lastImageIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  dragImageSize: PropTypes.number,
};

ImageToolbar.defaultProps = {
  lastX: 0,
  lastY: 0,
  lastImageIndex: -1,
  dragImageSize: 80,
};

export default ImageToolbar