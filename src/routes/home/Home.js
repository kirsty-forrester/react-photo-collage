/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { bind, debounce } from 'lodash';

import s from './Home.css';
import CollageLayers from '../../components/CollageLayers';

class Home extends Component {
  static propTypes = {
    template: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  };
  constructor(props) {
    super(props);

    this.state = {
      containerWidth: 0,
    };

    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    document.body.style.overflow = 'hidden';
    if (window) {
      window.addEventListener('resize', debounce(this.handleResize, 1000));
      this.handleResize();
    }
  }
  componentWillUnmount() {
    if (window) {
      window.removeEventListener('resize', debounce(this.handleResize, 1000));
    }
  }
  handleResize() {
    let container = this.refs.container;
    if (container && window) {
      this.setState({
        containerWidth: container.clientWidth,
      });
    }
  }
  render() {
    let props = {
      containerWidth: this.state.containerWidth,
    };
    if (this.props.template) {
      props.template = this.props.template;
    }
    return (
      <div className={s.root}>
        <div className={s.container} ref="container">
          <CollageLayers {...props}/>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
