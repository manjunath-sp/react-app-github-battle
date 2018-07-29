var React = require('react');
var ReactDOM = require('react-dom');

require('./index.css');
var Popular = require('./components/Popular.js');
var App = require('./components/App.js')


ReactDOM.render(
    <App />,
    document.getElementById('app')
);

