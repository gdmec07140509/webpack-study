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
  constructor() {
    super(...arguments);

    this.state = {
      Text: null
    }
  }

  loadComponent() {
    import ('./text.js').then((Text) =>  {
        this.setState({
          Text: Text.default
        })
      })
  }

  render() {
    const { Text } = this.state;
    const funcA = a();
    return <div className="search-text">
      Search Text { funcA }
      {
        Text ? <Text /> : null
      }
      <img src={logo}  onClick={this.loadComponent.bind(this)}/>
    </div>;
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById('root')
)
