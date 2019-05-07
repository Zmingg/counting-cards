import React from 'react';
import ReactDOM from 'react-dom';
import {Counter} from '../src';

const App = class extends React.Component {

  state = {
    value: 0
  }

  componentDidMount() {
    setInterval(this.updateCounter, 1000);
  }

  updateCounter = () => {
    const value = this.state.value;
    this.setState({
      value: value + Math.round(Math.random() * 100)
    })
  }

  render() {
    const {value} = this.state;

    return (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <Counter value={value} padding={6} duration={1000} style={{fontSize: 100}}/>
      </div>
    );
  }
}

const MOUNT_NODE = document.getElementById('app');

ReactDOM.render(<App/>, MOUNT_NODE);

