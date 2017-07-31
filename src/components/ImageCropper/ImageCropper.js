import React, { Component } from 'react';
import ReactAvatarEditor from 'react-avatar-editor';
import { bind, debounce, snakeCase } from 'lodash';

import ImageUploader from '../ImageUploader';

class ImageCropper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: props.image,
      x: props.x || 0,
      y: props.y || 0,
      position: props.position || { x: 0.5, y: 0.5 },
      scale: props.scale || 1,
      rotate: props.rotate || 0,
      borderRadius: props.borderRadius || 0,
      preview: null,
      width: props.width || 200,
      height: props.height || 200
    };

    this.handleScale = this.handleScale.bind(this);
    this.handlePositionChange = this.handlePositionChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.debounceChange = bind(debounce(this.handleChange, 100), this);
    this.receiveImage = this.receiveImage.bind(this);
    this.handleImageReady = this.handleImageReady.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.image !== this.props.image) {
      this.setState({ image: nextProps.image });
    }
  }
  handleScale(e) {
    const scale = parseFloat(e.target.value);
    this.setState({ scale });

    this.debounceChange.bind(this);
  }

  handlePositionChange(position) {
    this.setState({ position });

    this.debounceChange.bind(this);
  }

  handleChange() {
    this.handleImageReady();
  }

  receiveImage(image) {
    this.setState({ image });
  }

  handleImageReady() {
    if (this.editor) {
      let { image, x, y, width, height, scale, position } = this.state;
      let { areaId } = this.props;

      let imageKey = `${areaId}-${snakeCase(image)}-${position.x}-${position.y}-${width}-${height}-${scale}`;
      let canvasImage = this.editor.getImageScaledToCanvas(); // canvas

      this.props.handleImageReady(canvasImage, x, y, width, height, scale, areaId, imageKey);
    }
  }

  render() {
    const { image, scale, ...other } = this.props;
    const { width, height, x, y } = this.state;

    return (
      <div className="image-cropper">
        <input
          name="scale"
          type="range"
          onChange={this.handleScale}
          min="1"
          max="2"
          step="0.01"
          defaultValue={this.state.scale}
          style={{
            position: 'absolute',
            zIndex: 1,
            width: '140px',
            left: `${( (width - 140)/2) + x}px`,
            top: `${(height - 20) + y}px`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            display: 'block',
            zIndex: 1,
            width: '40px',
            height: '40px',
            left: `${( (width - 40)/2) + x}px`,
            top: `${( (height - 40)/2) + y}px`,
            background: 'url(assets/img/icon_camera.png)',
            backgroundSize: '40px 40px',
            overflow: 'hidden'
          }}
        >
          <ImageUploader receiveImage={this.receiveImage}/>
        </div>
        <ReactAvatarEditor
          ref={(e) => { this.editor = e; }}
          {...other}
          image={this.state.image}
          scale={this.state.scale}
          onImageReady={this.handleImageReady}
          onImageChange={this.debounceChange}
          onPositionChange={this.handlePositionChange}
        />
        { this.props.isDragging ? <div
          id={`area-${this.props.areaId}`}
          style={{
            position: 'absolute',
            width: `${this.props.width}px`,
            height: `${this.props.height}px`,
            left: `${this.props.x}px`,
            top: `${this.props.y}px`,
            display: 'block',
            zIndex: 4
          }}
        /> : null }
      </div>
    )
  }
}

export default ImageCropper
