'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class HelloWrold extends React.Component {
  render() {
    return (
      <div>Hello World

        <span>1233</span>
      </div>
    )
  }
}

ReactDOM.render(
  <HelloWrold />,
  document.getElementById("root")
)
