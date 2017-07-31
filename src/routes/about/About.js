import React, { Component } from 'react';
import Templates from '../../components/Templates';

import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './About.css';

class About extends Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Templates/>
        </div>
      </div>
    )
  }
}


export default withStyles(s)(About)