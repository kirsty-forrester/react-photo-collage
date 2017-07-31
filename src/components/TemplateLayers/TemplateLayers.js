import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map, pick, some } from 'lodash';

import { getImageAreas } from '../../utils/canvasAreas';

class TemplateLayers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      imageWidth: false,
      imageHeight: false,
      canvasWidth: false,
      canvasHeight: false,
    };

    this.getCanvasSize = this.getCanvasSize.bind(this);
    this.prepareCanvas = this.prepareCanvas.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.drawTemplate = this.drawTemplate.bind(this);
    this.getTemplateAreas = this.getTemplateAreas.bind(this);
  }
  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');

    if (this.props.templateImage) {
      this.prepareCanvas(this.props.templateImage, this.props.backgroundColor, this.props.containerWidth);
    }
  }
  componentWillReceiveProps(nextProps) {
    let pickProps = ['templateImage', 'containerWidth'];
    let currentProps = pick(this.props, pickProps);
    let newProps = pick(nextProps, pickProps);

    if(some(newProps, (value, key) => value !== currentProps[key])) {
      this.prepareCanvas(nextProps.templateImage, nextProps.backgroundColor, nextProps.containerWidth);
    } else if(nextProps.backgroundColor !== this.props.backgroundColor) {
      this.drawTemplate(nextProps.templateImage, this.state.image, nextProps.backgroundColor);
    }
  }
  getCanvasSize(containerWidth, imageWidth, imageHeight) {
    let imageRatio = imageWidth / imageHeight;
    let useContainerWidth = containerWidth > 0 && containerWidth < imageWidth;
    let width = useContainerWidth ? containerWidth : imageWidth;
    let height = useContainerWidth ? containerWidth / imageRatio : imageHeight;

    return { width, height };
  }
  prepareCanvas(templateImage, backgroundColor, containerWidth) {
    // console.log('TemplateLayers prepareCanvas');
    this.loadImage(templateImage, containerWidth).then((image) => {
      this.drawTemplate(templateImage, image, backgroundColor)
    });
  }
  loadImage(templateImage, containerWidth) {
    return new Promise((resolve, reject) => {
      let image = new Image();
      image.onload = () => {

        let { width, height } = this.getCanvasSize(containerWidth, image.width, image.height);

        if (this.canvas) {
          this.canvas.width = width;
          this.canvas.height = height;

          this.setState({
            image,
            imageWidth: image.width,
            imageHeight: image.height,
            canvasWidth: width,
            canvasHeight: height,
          });

          resolve(image);
        } else {
          reject({ message: 'Canvas not found' });
        }
      };
      image.onerror = () => {
        reject({ message: 'Image not found' });
      };
      image.crossOrigin = 'Anonymous';
      image.src = templateImage;
    });
  }
  drawTemplate(templateImage, image, backgroundColor) {
    // console.log('TemplateLayers drawTemplate');
    // Fill background color
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.fillStyle = backgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.globalCompositeOperation = 'destination-out';

    // Draw template image
    this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);

    this.props.setTemplateSize(this.canvas.width, this.canvas.height);
    this.props.setTemplateOverlay(this.canvas);

    this.getTemplateAreas(templateImage);
  }
  getTemplateAreas(templateImage) {
    let splitTemplateName = this.props.template.split('_');
    let numTemplateAreas = parseInt(splitTemplateName[0], 10);

    getImageAreas(templateImage, this.canvas.width, this.canvas.height, numTemplateAreas).then((areas) => {
      this.props.setTemplateAreas(areas);
    });
  }
  render() {
    return (
      <div>
        <canvas
          id="template-layers"
          ref={(c) => this.canvas = c}
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      </div>
    )
  }
}

TemplateLayers.propTypes = {
  setTemplateSize: PropTypes.func.isRequired,
  setTemplateOverlay: PropTypes.func.isRequired,
  setTemplateAreas: PropTypes.func.isRequired,
  template: PropTypes.string.isRequired,
};


export default TemplateLayers
