import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { startCase } from 'lodash';

import s from './Templates.css';

class Templates extends Component {
  render() {
    const { templates, path } = this.props;

    return (
      <div className={s.templates}>
        {
          templates.map((template, index) => {
            let key = `template-${index}-${template}`;
            return (
              <a key={key} className={s.template} href={`/?template=${template}`}>
                <div className={s.templatePreview}>
                  <img src={`/${path}/${template}.png`} alt={template}/>
                </div>

                {startCase(template)}
              </a>
            )
          })
        }
      </div>
    )
  }
}

Templates.propTypes = {
  path: PropTypes.string,
  templates: PropTypes.array,
};

Templates.defaultProps = {
  path: 'assets/img',
  templates: [
    '4circles',
    'boxes1',
  ],
};

export default withStyles(s)(Templates)
