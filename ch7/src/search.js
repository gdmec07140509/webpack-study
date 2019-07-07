'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class HelloWrold extends React.Component {
  render() {
    return (
      <div>Hello World 12</div>
    )
  }
}

ReactDOM.render(
  <HelloWrold />,
  document.getElementById("root")
)
