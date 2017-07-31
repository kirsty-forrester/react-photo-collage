import React, { Component } from 'react';
import { keys } from 'lodash';

import SvgWrapper from '../components/SvgWrapper';

const Circles1 = (props) => <SvgWrapper
  id={props.id}
  onSvgLoadFinished={props.onSvgLoadFinished}
>
  <svg
    width={props.width || '100%'}
    height={props.height || '100%'}
    viewBox="0 0 800 800"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlSpace="preserve"
    style={{
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      strokeLineJoin: 'round',
      strokeMiterLimit: '1.41421px',
      position: 'absolute',
    }}
  >
    <circle className="photo-frame" cx="200.746" cy="201.956" r="175" style={{ fill: 'rgb(214,214,214)' }}/>
    <circle className="photo-frame" cx="601.885" cy="201.956" r="175" style={{ fill: 'rgb(214,214,214)' }}/>
    <circle className="photo-frame" cx="200.746" cy="602.031" r="175" style={{ fill: 'rgb(214,214,214)' }}/>
    <circle className="photo-frame" cx="601.885" cy="602.031" r="175" style={{ fill: 'rgb(214,214,214)' }}/>
  </svg>
</SvgWrapper>;

const Squares1 = (props) => <SvgWrapper
  id={props.id}
  onSvgLoadFinished={props.onSvgLoadFinished}
>
  <svg
    width={props.width || '100%'}
    height={props.height || '100%'}
    viewBox="0 0 800 600"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlSpace="preserve"
    style={{
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      strokeLineJoin: 'round',
      strokeMiterLimit: '1.41421px',
      position: 'absolute',
    }}
  >
    <rect className="photo-frame" x="0" y="0" width="396.5" height="296.5" style={{ fill: 'rgb(214,214,214)' }}/>
    <rect className="photo-frame" x="403.5" y="0" width="396.5" height="296.5" style={{ fill: 'rgb(214,214,214)' }}/>
    <rect className="photo-frame" x="0" y="303.5" width="396.5" height="296.5" style={{ fill: 'rgb(214,214,214)' }}/>
    <rect className="photo-frame" x="403.5" y="303.5" width="396.5" height="296.5" style={{ fill: 'rgb(214,214,214)' }}/>
  </svg>
</SvgWrapper>;

const Boxes1 = (props) => <SvgWrapper
  id={props.id}
  onSvgLoadFinished={props.onSvgLoadFinished}
>
  <svg
    width={props.width || '100%'}
    height={props.height || '100%'}
    viewBox="0 0 1000 800"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlSpace="preserve"
    style={{
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      strokeLineJoin: 'round',
      strokeMiterLimit: '1.41421px',
      position: 'absolute',
    }}
  >

    <rect transform="matrix(1,0,0,1,0,-40.3294)" className="photo-frame" x="26.956" y="377.312" width="210.499" height="223.977" style={{ fill: 'rgb(214,214,214)' }}/>
    <rect transform="matrix(1,0,0,1,0,-40.3294)" className="photo-frame" x="264.41" y="377.312" width="222.112" height="223.977" style={{ fill: 'rgb(214,214,214)' }}/>

    <rect className="photo-frame" x="26.956" y="26.956" width="459.567" height="283.072" style={{ fill: 'rgb(214,214,214)' }}/>
    <rect className="photo-frame" x="26.956" y="587.915" width="459.567" height="185.129" style={{ fill: 'rgb(214,214,214)' }}/>
    <rect className="photo-frame" x="513.478" y="336.983" width="459.567" height="436.061" style={{ fill: 'rgb(214,214,214)' }}/>
    <rect className="photo-frame" x="513.478" y="26.956" width="459.567" height="283.072" style={{ fill: 'rgb(214,214,214)' }}/>
  </svg>
</SvgWrapper>;

const templates = {
  '4-circles-1': Circles1,
  '4-squares-1': Squares1,
  'boxes-1': Boxes1,
};

export const getTemplate = (templateId, props) => {
  let SvgTemplate = templates[templateId];
  return <SvgTemplate id={templateId} {...props}/>;
};

export const templateOptions = keys(templates);