import React from 'react';
import ReactDOM from 'react-dom';
import Home from './containers/Home';
import './style/index.scss';

const MOUNT_NODE = document.getElementById('app');

ReactDOM.render(<Home/>, MOUNT_NODE);

