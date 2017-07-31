/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';

class Navigation extends React.Component {
  render() {
    return (
      <div className={s.root} role="navigation">

        <span className={s.spacer}>Templates:</span>

        <Link className={s.link} to="?template=4_circles">4 Circles</Link>
        <Link className={s.link} to="?template=4_squares">4 Squares</Link>
        <Link className={s.link} to="?template=4_hearts">4 Hearts</Link>
        <Link className={s.link} to="?template=4_stars">4 Stars</Link>
        <Link className={s.link} to="?template=6_boxes">Boxes</Link>
      </div>
    );
  }
}

export default withStyles(s)(Navigation);
