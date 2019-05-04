import React, {Component} from 'react';
import Counter from 'components/Counter';

export default class Home extends Component {

  state = {
    number: 1,
  };

  componentDidMount() {
    // this.setTimeActive();
  }

  setTimeActive = () => {
    setInterval(() => {
      this.handleChange();
    }, 3000)
  };

  handleChange = () => {
    this.setState({
      number: this.state.number + 2 //Math.ceil(Math.random() * 50)
    })
  };

  render() {
    const {number} = this.state;

    return (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <Counter value={number} padding={1} duration={1000} style={{fontSize: 60}}/>
        <button style={{marginTop: '50px'}} onClick={this.handleChange}>Change</button>
      </div>
    );
  }
}