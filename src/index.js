import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './components/Counter';
import './style/index.scss';

const MOUNT_NODE = document.getElementById('app');

ReactDOM.render(<Counter/>, MOUNT_NODE);

