import React from 'react';
import chai, { expect, assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Canvas from 'canvas';
import { getImageAreas } from './canvasAreas';

chai.use(chaiAsPromised);

window.Image = Canvas.Image;
global.Image = window.Image;

import circleTemplateImage from '../data/4circles';

let canvasWidth = 800;
let canvasHeight = 800;
let expected = {
  numTemplateAreas: 4,
};

describe('canvasAreas', function() {

  it('identifies all areas of template image', function() {
    return expect(getImageAreas(circleTemplateImage, canvasWidth, canvasHeight)).to.eventually.have.length(expected.numTemplateAreas);
  });

  it('calls getImageAreas', (done) => {
    getImageAreas(circleTemplateImage, canvasWidth, canvasHeight).then((areas) => {
      assert.lengthOf(
        areas,
        expected.numTemplateAreas,
        `Expected ${areas.length} to equal ${expected.numTemplateAreas}`
      );
      done();
    });
  });

});