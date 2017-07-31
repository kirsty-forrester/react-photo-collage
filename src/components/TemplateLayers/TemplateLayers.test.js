/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions */
import React from 'react';
import chaiEnzyme from 'chai-enzyme';
import chaiAsPromised from 'chai-as-promised';
import chai, { expect, assert } from 'chai';
import { mount, render } from 'enzyme';
import sinon, {spy, stub} from 'sinon';
import Canvas from 'canvas';
import { sum, pick, get, flatMap } from 'lodash';

import circleTemplateImage from '../../data/4circles';

chai.use(chaiEnzyme());
chai.use(chaiAsPromised);

import App from '../App';
import Layout from '../Layout';
import TemplateLayers from './TemplateLayers';

import { getPixel, rgbToHex } from '../../utils/canvasAreas';

window.Image = Canvas.Image;
global.Image = window.Image;

let props = {
  id: "template-layers",
  templateImage: circleTemplateImage,
  template: '4_circles',
  backgroundColor:"#eeeeee",
  setTemplateSize: (width, height) => { return { width, height } },
  setTemplateOverlay: (overlay) => { return overlay },
  setTemplateAreas: (templateAreas) => { return templateAreas },
};

let containerWidth = 1000;
let expected = {
  numTemplateAreas: 4,
  imageWidth: 800,
  imageHeight: 800,
};
let component;
let setTemplateAreas = spy(props, 'setTemplateAreas');
let setTemplateOverlay = spy(props, 'setTemplateOverlay');
describe('TemplateLayers', function() {
  beforeEach((done) => {
    setTimeout(() => {
      component = mount(<TemplateLayers
        {...props}
        containerWidth={containerWidth}
      />);
      done();
    }, 0);
  });
  it('renders the canvas correctly', function() {
    const renderTemplateLayers = render(
      <App context={{ insertCss: () => {}, fetch: () => {} }}>
        <Layout>
          <TemplateLayers
            {...props}
            containerWidth={containerWidth}
          />
        </Layout>
      </App>,
    );
    expect(renderTemplateLayers.find('canvas').length).to.eq(1);
  });

  it('sets image width and height correctly', () => {
    expect(component).to.not.have.state('imageWidth', false);
    expect(component).to.not.have.state('imageHeight', false);

    expect(component.state('imageWidth')).to.eq(expected.imageWidth);
    expect(component.state('imageHeight')).to.eq(expected.imageHeight);
  });

  it('sets canvas width and height to correct ratio', () => {
    expect(component.state('imageWidth')).to.be.above(0);

    const imageRatio = component.state('imageWidth') / component.state('imageHeight');

    expect(imageRatio).to.be.above(0);

    const canvasRatio = component.state('canvasWidth') / component.state('canvasHeight');

    expect(canvasRatio).to.eq(imageRatio);
  });

  it('correctly calls props.setTemplateOverlay', () => {
    let canvas = setTemplateOverlay.args[0][0];

    assert.isTrue(setTemplateOverlay.called);
    assert.isTrue(
      canvas.nodeName.toLowerCase() === 'canvas',
      'setTemplateOverlay received canvas element'
    );
    assert.equal(
      canvas.width,
      expected.imageWidth,
      `${canvas.width} equals expected ${expected.imageWidth}`
    );
    assert.equal(
      canvas.height,
      expected.imageHeight,
      `${canvas.height} equals expected ${expected.imageHeight}`
    );

    setTemplateAreas.reset();
  });

  it('correctly calls props.setTemplateAreas', () => {
    let templateAreas = setTemplateAreas.returnValues[0];
    let templateAreaSizes = flatMap(templateAreas, area => get(area, 'width') * get(area, 'height'));
    let expectedTotalArea = expected.imageWidth * expected.imageHeight;

    assert.isTrue(setTemplateAreas.calledOnce);
    assert.lengthOf(
      templateAreas,
      expected.numTemplateAreas,
      `${JSON.stringify(templateAreas)} has length of ${expected.numTemplateAreas}`
    );
    assert.isAtMost(
      sum(templateAreaSizes),
      expectedTotalArea,
      `Sum of template area sizes - ${JSON.stringify(templateAreaSizes)} - is at most ${expectedTotalArea}`
    );
  });

  it('correctly sets templateOverlay canvas background color', () => {
    let canvas = setTemplateOverlay.args[0][0];
    let imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
    let pixel = getPixel(imageData.data, canvas.width, 1, 1);
    let hexPixel = rgbToHex(pixel.r, pixel.g, pixel.b);

    assert.equal(
      hexPixel,
      props.backgroundColor,
      `${hexPixel} should be equal to ${props.backgroundColor}`
    );
  });
});
