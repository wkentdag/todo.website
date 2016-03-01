const React = require('react');
const ReactDOM = require('react-dom');
import List from './list/components.list.js';

const Bootstrapper = {
  start() {
    ReactDOM.render(
      <List url='/api/notes' pollInterval={2000} />,
      document.getElementById('content')
    );
  }
}
export default Bootstrapper;
