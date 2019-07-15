'use strict';

// import React from 'react';
// import logo from './images/1.png';
// import './search.less';
// import '../../common'

const React = require('react');
const logo = require('./images/1.png');
require('./search.less');
require('../../common');

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
    return <div className="search-text">
      123adasd
      {
        Text ? <Text /> : null
      }
      <img src={logo}  onClick={this.loadComponent.bind(this)}/>
    </div>;
  }
}

module.exports = <Search />;
