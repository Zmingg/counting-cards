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
      this.setState({
        number: this.state.number + 1
      })
    }, 1000)
  };

  handleChange = () => {
    this.setState({
      number: this.state.number + 1
    })
  };

  render() {
    const {number} = this.state;

    return (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <Counter number={number} padding={1}/>
        <button style={{marginTop: '50px'}} onClick={this.handleChange}>Change</button>
      </div>
    );
  }
}