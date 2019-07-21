'use strict';

const React = require('react');
const logo = require('./images/1.png');
require('./search.less');

class Search extends React.Component {
  render() {
    return <div className="hello-text">
      Hello World !!
      <img src={logo}/>
    </div>;
  }
}

module.exports = <Search />;
