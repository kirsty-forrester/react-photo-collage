import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { range, map, merge, isNull, forOwn, parseInt, sortBy, set, has, bind, debounce, keys } from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CollageLayers.css';

import ImageToolbar from '../ImageToolbar';
import TemplateLayers from '../TemplateLayers';
import PhotoLayers from '../PhotoLayers';
import CollagePreview from '../CollagePreview';

class CollageLayers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Mouse related events:
      lastX: 0,
      lastY: 0,
      isPressed: false,
      dragImage: false,
      dragItem: false,
      lastCanvasIndex: -1,
      lastImageIndex: -1,

      // Images:
      images: props.images || [],
      allImagesLoaded: false,
      maskedImages: {},
      drawnImages: {},

      // Template settings:
      templateAreas: [],
      templateAreasReady: false,
      templateWidth: false,
      templateHeight: false,
      templateOverlay: false,
      backgroundColor: props.backgroundColor || '#eeeeee',
    };

    this.prepareImages = bind(debounce(this.prepareImages, 1000), this);
    this.prepareEvents = this.prepareEvents.bind(this);
    this.resetPositions = this.resetPositions.bind(this);
    this.findCanvasInBounds = this.findCanvasInBounds.bind(this);
    this.getCanvasPos = this.getCanvasPos.bind(this);
    this.touchPosition = this.touchPosition.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.setAllImagesLoaded = this.setAllImagesLoaded.bind(this);
    this.loadMaskedImage = this.loadMaskedImage.bind(this);
    this.handleMaskedImageDrawn = this.handleMaskedImageDrawn.bind(this);
    this.setTemplateAreas = this.setTemplateAreas.bind(this);
    this.setTemplateOverlay = this.setTemplateOverlay.bind(this);
    this.setTemplateSize = this.setTemplateSize.bind(this);
    this.changeBackgroundColor = this.changeBackgroundColor.bind(this);
    this.changeBgColorDebounced = bind(debounce(this.changeBackgroundColor, 500), this);
  }
  componentDidMount() {
    this.prepareEvents();
  }
  componentDidUpdate() {
    if (!this.state.allImagesLoaded) {
      this.prepareImages(this.props.images);
    }
  }
  prepareImages(images) {
    this.setState({
      images,
    });
  }
  prepareEvents() {
    this.container = document.getElementById('draggable-wrapper');

    window.addEventListener('touchstart', this.handleStart);
    window.addEventListener('touchend', this.handleEnd);
    window.addEventListener('touchcancel', this.handleCancel);
    window.addEventListener('touchleave', this.handleEnd);
    window.addEventListener('touchmove', this.handleMove);

    // Mouse events
    window.addEventListener('mousedown', this.handleStart);
    window.addEventListener('mouseup', this.handleEnd);
    // window.addEventListener('mouseout', this.handleCancel);
    window.addEventListener('mouseleave', this.handleEnd);
    window.addEventListener('mousemove', this.handleMove);
  }
  resetPositions() {
    let images = document.getElementsByClassName('draggable-image');
    for(let i = 0; i < images.length; i++) {
      images.item(i).style.left = '';
      images.item(i).style.top = '';
      images.item(i).style.position = 'relative';
    }

    this.setState({
      lastX: 0,
      lastY: 0,
      lastImageIndex: -1,
      lastCanvasIndex: -1,
      isPressed: false,
      dragImage: false,
      dragItem: false,
    });
  }
  findCanvasInBounds(x, y) {
    let templateAreas = this.state.templateAreas;
    for(let i = 0; i < templateAreas.length; i++) {
      let area = templateAreas[i];
      if (x >= area.x && x <= area.x + area.width && y >= area.y && y <= area.y + area.height) {
        area.index = i;
        return area;
      }
    }
    return false;
  }
  getCanvasPos(el) {
    let canvas = document.getElementById(el) || this.container;
    let _x = canvas.offsetLeft;
    let _y = canvas.offsetTop;

    while(canvas = canvas.offsetParent) {
      _x += canvas.offsetLeft - canvas.scrollLeft;
      _y += canvas.offsetTop - canvas.scrollTop;
    }

    return {
      left : _x,
      top : _y
    }

  }
  touchPosition(e) {
    let clientX = e.clientX;
    let clientY = e.clientY;
    let left = this.getCanvasPos(e.target).left;
    let top = this.getCanvasPos(e.target).top;

    if (e.changedTouches) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    }

    let mouseX = clientX - left - window.pageXOffset;
    let mouseY = clientY - top - window.pageYOffset;

    return {
      x : mouseX,
      y : mouseY
    };
  }
  handleStart(e) {
    // console.log('handleStart, e:');
    // console.log(e);

    let { x, y } = this.touchPosition(e);

    // console.log('handleStart, x: ' + x + ', y: ' + y);

    if (e.target && e.target.classList.contains('draggable-image')) {
      let dragItem = e.target;
      let dragImage = dragItem.children[0].getAttribute('src');
      let lastImageIndex = parseInt(dragItem.getAttribute('data-index')) || -1;

      this.setState({
        isPressed: true,
        lastX: x,
        lastY: y,
        lastImageIndex,
        dragItem,
        dragImage,
      });
    }
  }
  handleMove(e) {
    let { isPressed, dragItem, lastCanvasIndex } = this.state;

    if (isPressed) {
      //console.log('handleMove, e.target:');
      // console.log(e.target);

      let { x, y } = this.touchPosition(e);

      dragItem.style.position = 'absolute';
      dragItem.style.left = `${x}px`;
      dragItem.style.top = `${y}px`;

      let matchingCanvas = this.findCanvasInBounds(x, y);

      if (matchingCanvas) {
        lastCanvasIndex = matchingCanvas.index;
      }

      this.setState({
        lastX: x,
        lastY: y,
        dragItem,
        lastCanvasIndex,
      });
    }
  }
  handleEnd(e) {
    let { isPressed, lastCanvasIndex, images, dragImage } = this.state;
    if (isPressed) {
      // console.log('handleEnd, e:');
      // console.log(e);
      this.resetPositions();

      // console.log('handleEnd, lastCanvasIndex: ' + lastCanvasIndex);

      if (lastCanvasIndex !== -1) {

        let currentImage = images[lastCanvasIndex];

        images.splice(lastCanvasIndex, 1, dragImage);

        // If image has been removed from image list, add it back
        if (currentImage !== dragImage && images.indexOf(currentImage) == -1) {
          images.push(currentImage);
        }

        this.setState({
          images,
          lastX: 0,
          lastY: 0,
        });
      }
    }
  }
  handleCancel() {
    this.resetPositions();
  }
  setAllImagesLoaded(allImagesLoaded = true) {
    this.setState({ allImagesLoaded });
  }
  loadMaskedImage(maskedImage) {
    let { maskedImages, templateAreas } = this.state;
    let { areaId, imageKey } = maskedImage;

    templateAreas[areaId].id = `area-${areaId}`;

    if (!has(maskedImages[areaId]) || maskedImages[areaId].imageKey !== imageKey) {
      maskedImages[areaId] = maskedImage;
    }

    this.setState({ maskedImages, templateAreas });
  }
  handleMaskedImageDrawn(areaId, imageKey) {
    let { drawnImages } = this.state;
    if (!has(drawnImages, areaId)) {
      set(drawnImages, areaId, imageKey);

      this.setState({ drawnImages });
    }
  }
  setTemplateAreas(templateAreas) {
    // console.log('CollageLayers setTemplateAreas:');
    // console.log(templateAreas);

    this.setState({
      templateAreas,
      templateAreasReady: true,
    });
  }
  setTemplateOverlay(templateOverlay) {
    this.setState({ templateOverlay });
  }
  setTemplateSize(templateWidth, templateHeight) {
    this.setState({ templateWidth, templateHeight });
  }
  changeBackgroundColor(backgroundColor) {
    this.setState({ backgroundColor });
  }
  render() {
    const { dragImageSize, template, templatePath, containerWidth } = this.props;
    const {
      lastX,
      lastY,
      lastImageIndex,
      images,
      backgroundColor,
      templateAreas,
      templateWidth,
      templateHeight,
      templateOverlay,
      templateAreasReady,
      allImagesLoaded,
      maskedImages,
      drawnImages
    } = this.state;

    const attributes = {
      className: 'collage-layers',
      style: {
        position: 'relative',
        width: `${templateWidth}px`,
        height: `${templateHeight}px`,
        display: 'block',
      },
    };

    return (
      <div id="draggable-wrapper" {...attributes}>
        <ImageToolbar
          images={images}
          lastX={lastX}
          lastY={lastY}
          lastImageIndex={lastImageIndex}
          dragImageSize={dragImageSize}
          setDragImage={this.setDragImage}
        />
        <div className={s.toolbar}>
          <div>
            <input
              className={s.colorPicker}
              ref="colorPicker"
              type="color"
              defaultValue={backgroundColor || '#ffffff'}
              onChange={(e) => this.changeBgColorDebounced(e.target.value)}
            />
          </div>
          <div>

          </div>
        </div>
        <CollagePreview
          templateWidth={templateWidth}
          templateHeight={templateHeight}
          templateOverlay={templateOverlay}
          maskedImages={maskedImages}
          drawnImages={drawnImages}
          handleMaskedImageDrawn={this.handleMaskedImageDrawn}
        />
        <TemplateLayers
          templateImage={templatePath ? `${templatePath}/${template}.png` : template}
          template={template}
          backgroundColor={backgroundColor}
          containerWidth={containerWidth}
          setTemplateAreas={this.setTemplateAreas.bind(this)}
          setTemplateSize={this.setTemplateSize}
          setTemplateOverlay={this.setTemplateOverlay}
        />

        <PhotoLayers
            images={images}
            templateAreas={templateAreas}
            templateWidth={templateWidth}
            templateHeight={templateHeight}
            allImagesLoaded={allImagesLoaded}
            loadMaskedImage={this.loadMaskedImage}
            setAllImagesLoaded={this.setAllImagesLoaded}
          />

      </div>
    )
  }
}

CollageLayers.propTypes = {
  template: PropTypes.string,
  templatePath: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  backgroundColor: PropTypes.string,
  images: PropTypes.array,
  canvasWidth: PropTypes.number,
  canvasHeight: PropTypes.number,
  containerWidth: PropTypes.number,
  dragImageSize: PropTypes.number,
  dragImagePadding: PropTypes.number,
};

CollageLayers.defaultProps = {
  template: '4_circles',
  templatePath: '/assets/img',
  backgroundColor: '#eeeeee',
  images: [
    'assets/img/cooperglasses.jpg',
    'assets/img/rainbowcoat.jpg',
    'assets/img/yellowtoyscruffy.jpg',
    'assets/img/cooperhipster.jpg',
    'assets/img/wetderp.jpg',
    'assets/img/totorosleepy.jpg',
  ],
  canvasWidth: 300,
  canvasHeight: 300,
  containerWidth: 0,
  dragImageSize: 80,
  dragImagePadding: 10,
};

export default withStyles(s)(CollageLayers);