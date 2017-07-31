/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import chaiEnzyme from 'chai-enzyme'
import chai, { expect } from 'chai';
import { render } from 'enzyme';

chai.use(chaiEnzyme());

import App from '../App';
import Layout from '../Layout';
import ImageToolbar from './ImageToolbar';

describe('ImageToolbar', () => {

  it('renders images correctly', () => {
    let imageUrls = [
      'assets/img/cooperglasses.jpg',
      'assets/img/rainbowcoat.jpg',
      'assets/img/yellowtoyscruffy.jpg',
    ];
    const renderImageToolbar = render(
      <App context={{ insertCss: () => {}, fetch: () => {} }}>
        <Layout>
          <ImageToolbar
            images={imageUrls}
          />
          </Layout>
        </App>,
    );
    let imageToolbar = renderImageToolbar.find('.image-toolbar');
    let images = imageToolbar.find('img');

    // Check all images are rendered
    expect(images.length).to.eq(3);

    // Check all image URLs appear in toolbar
    for(let i = 0; i < imageUrls.length; i++) {
      expect(renderImageToolbar.html()).to.contain(imageUrls[i]);
    }
  });

});
