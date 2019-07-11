'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import logo from './images/1.png';

import './search.less';
import '../../common'

import { a, b } from './tree-shaking'

if (false) {
  b();
}

class Search extends React.Component {
  render() {
    const funcA = a();
    return <div className="search-text">
      Search Text { funcA }
      <img src={logo} />
    </div>;
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById('root')
)
