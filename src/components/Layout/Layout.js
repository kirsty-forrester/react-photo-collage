/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';
import Header from '../Header';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { context } = this.props;
    const childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { context });
    });
    return (
      <div>
        <Header />
        {childrenWithProps}
      </div>
    );
  }
}

export default withStyles(s)(Layout);
