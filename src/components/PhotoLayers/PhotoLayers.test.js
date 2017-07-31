import React from 'react';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect, assert } from 'chai';
import { mount, render, shallow } from 'enzyme';
import sinon, {spy, stub} from 'sinon';
import Canvas from 'canvas';

chai.use(chaiEnzyme());

import PhotoLayers from './PhotoLayers';

import cooperglasses from '../../data/images/cooperglasses';
import rainbowcoat from '../../data/images/rainbowcoat';
import yellowtoyscruffy from '../../data/images/yellowtoyscruffy';
import cooperhipster from '../../data/images/cooperhipster';
import wetderp from '../../data/images/wetderp';
import totorosleepy from '../../data/images/totorosleepy';

window.Image = Canvas.Image;
global.Image = window.Image;

let component;
let props = {
  allImagesLoaded: false,
  templateWidth: 800,
  templateHeight: 800,
  images: [
    cooperglasses,
    rainbowcoat,
    yellowtoyscruffy,
    cooperhipster,
    wetderp,
    totorosleepy
  ],
  templateAreas: [
    {
      id: 'area-0',
      width: 351,
      height: 350,
      x: 25,
      y: 27,
    },
    {
      id: 'area-1',
      width: 351,
      height: 350,
      x: 25,
      y: 427,
    },
    {
      id: 'area-2',
      width: 351,
      height: 350,
      x: 426,
      y: 27,
    },
    {
      id: 'area-3',
      width: 351,
      height: 350,
      x: 426,
      y: 427,
    },
  ],
  setAllImagesLoaded: (allImagesLoaded) => {
    return allImagesLoaded;
  },
  loadMaskedImage: (maskedImage) => {
    return maskedImage;
  },
};
let expected = {
  numTemplateAreas: 4,
};
let loadMaskedImage = spy(props, 'loadMaskedImage');
let setAllImagesLoaded = spy(props, 'setAllImagesLoaded');

describe('PhotoLayers', function() {

  beforeEach((done) => {
    setTimeout(() => {
      loadMaskedImage.reset();
      setAllImagesLoaded.reset();
      component = mount(<PhotoLayers {...props}/>);
      done();
    }, 0);
  });

  it('renders image croppers', () => {
    expect(component.find('.image-cropper')).to.have.length(expected.numTemplateAreas);
  });

  it('updates loaded images in state', () => {
    expect(component.state('loadedImages')).to.have.length(expected.numTemplateAreas);
  });

  it('calls props.setAllImagesLoaded with true', () => {
    assert.isTrue(setAllImagesLoaded.calledWith(true));
  });

  it('calls props.loadMaskedImage', () => {
    assert.isTrue(loadMaskedImage.called);
    assert.lengthOf(
      loadMaskedImage.args,
      expected.numTemplateAreas,
      `${loadMaskedImage.args} should have length equal to ${expected.numTemplateAreas}`
    );

    let maskedImageArgs = loadMaskedImage.args[0];
    for(let i = 0; i < maskedImageArgs.length; i++) {
      expect(maskedImageArgs[i].width).to.equal(props.templateAreas[i].width);
      expect(maskedImageArgs[i].height).to.equal(props.templateAreas[i].height);
      expect(maskedImageArgs[i].x).to.equal(props.templateAreas[i].x);
      expect(maskedImageArgs[i].y).to.equal(props.templateAreas[i].y);
    }
  });

  it('renders canvas elements inside image croppers', () => {
    let canvasElements = component.find('canvas');
    let templateAreas = component.prop('templateAreas');

    expect(canvasElements).to.have.length(expected.numTemplateAreas);
    expect(templateAreas).to.have.length(expected.numTemplateAreas);

    let i = 0;

    canvasElements.forEach(function(node) {
      expect(node).to.have.attr('width', `${templateAreas[i].width}`);
      expect(node).to.have.attr('height', `${templateAreas[i].height}`);

      expect(node).to.have.style('left', `${templateAreas[i].x}px`);
      expect(node).to.have.style('top', `${templateAreas[i].y}px`);
      expect(node).to.have.style('width', `${templateAreas[i].width}px`);
      expect(node).to.have.style('height', `${templateAreas[i].height}px`);
      i += 1;
    });
  });
});