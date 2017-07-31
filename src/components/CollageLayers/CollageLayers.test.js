import React from 'react';
import chaiEnzyme from 'chai-enzyme';
import { createWaitForElement } from 'enzyme-wait';
import chai, { expect, assert } from 'chai';
import { mount, render, shallow } from 'enzyme';
import sinon, {spy, stub, mock} from 'sinon';

chai.use(chaiEnzyme());

import TemplateLayers from '../TemplateLayers';
import PhotoLayers from '../PhotoLayers';
import CollageLayers from './CollageLayers';
import ImageToolbar from '../ImageToolbar';
import ImageCropper from '../ImageCropper';

import circleTemplateImage from '../../data/4circles';

let component;
let photoLayers;
let templateLayers;

describe('CollageLayers', function() {
  const waitForTemplateLayers = createWaitForElement('#template-layers');
  const waitForPhotoLayers = createWaitForElement('#photo-layers');
  const waitForCanvases = createWaitForElement('.canvas');
  const waitForImageCropper = createWaitForElement('.image-cropper');
  const waitForTestDiv = createWaitForElement('#test-div');

  component = mount(<CollageLayers templateImage="4circles" containerWidth={1000}/>);


  templateLayers = component.find(TemplateLayers);

  /*beforeEach(() => {
    component = TestUtils.renderIntoDocument(<CollageLayers containerWidth={1000}/>);
    renderedDOM = () => React.findDOMNode(component);
  });*/

  it('renders TemplateLayers', function() {
    expect(templateLayers).to.have.length(1);
    //expect(templateLayers.prop('containerWidth')).to.equal('bleh');
  });


  it('sets templateWidth and templateHeight', function() {
    //let loadImageSpy = spy(TemplateLayers.prototype, 'loadImage');
    //let setSizesSpy = spy(TemplateLayers.prototype, 'setSizes');

    component = mount(<CollageLayers templateImage="4circles" containerWidth={1000}/>);

    //return waitForTemplateLayers(component)
      //.then(comp => expect(comp).to.not.have.state('templateWidth', false));
      //.then(comp => expect(comp.find(TemplateLayers)).to.have.length(1));
      //.then(comp => expect(comp).to.not.have.state('templateWidth', false));
    //expect(component).to.not.have.state('templateWidth', false);
    //expect(component).to.not.have.state('templateHeight', false);

    //expect(component.state('templateWidth')).to.equal(800);
  });


  /*it('renders PhotoLayers', function() {
    return createWaitForElement('#photo-layers')(component)
      .then(comp => expect(comp.find('#photo-layers')).to.have.length(1))
      .then((comp2) => createWaitForElement('.image-cropper')(comp2))
      .then(comp3 => expect(comp3.find('.image-cropper')).to.have.length(4));
      //.then(comp => expect(comp.find('.canvas')).to.have.length(4));
      //.then(comp => expect(comp.find('#photo-layers')).to.have.length(1));
  });*/
  /*it('renders PhotoLayers', async ()=> {
    const componentReady = await waitForImageCropper(component);
    expect(componentReady.find('.image-cropper')).to.have.length(4);
  });*/

  /*it('renders PhotoLayers', function() {

    //const wrapper = mount(<CollageLayers templateImage="4circles" containerWidth={1000}/>);

    const photoLayers = wrapper.find(PhotoLayers);
    expect(photoLayers).to.have.length(1);
    expect(photoLayers.prop('images')).to.have.length(6);

    //wrapper.update();

    //setTimeout(() => {
      expect(wrapper.state('allImagesLoaded')).to.equal(true);
      expect(wrapper.state('templateAreasReady')).to.equal(true);
      //expect(wrapper.find(ImageCropper)).to.have.length(4);
    //Promise.resolve(() => {
      //expect(wrapper.find(ImageCropper)).to.have.length(4);

      //done();
    //});
    //}, 1000);
  });*/
});