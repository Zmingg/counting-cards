import React, {Component} from 'react';
import Counter from 'components/Counter';

export default class Home extends Component {

  state = {
    number: 123,
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


  render() {
    const {number} = this.state;

    return (
      <Counter number={number} padding={6}/>
    );
  }
}