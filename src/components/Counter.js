import React, {Component} from 'react';
import Number from './Number';
import PropTypes from 'prop-types';
import './counter.scss';



/**
 * Counting Card Component
 */
export default class Counter extends Component {

  static propTypes = {
    // Current number
    number: PropTypes.number.isRequired,
    // Number_padding
    padding: PropTypes.number,
    // Update Duration
    duration: PropTypes.number
  };

  static defaultProps = {
    number: 0,
    padding: 8,
    duration: 1000
  };

  state = {
    current: 0,
    offset: 1,
    numbers: [],
    prevProps: {},
    prevState: {},
  };

  static splitNumbers = (number, padding) => {
    const arr = number.toString().split('').map(v => parseInt(v));
    for (let i = arr.length; i < padding; i++) {
      arr.unshift(0);
    }
    return arr;
  };

  /**
   * 计时器
   **/
  timerAction = () => {
    const {number, duration, padding} = this.props;
    const {current} = this.state;
    if (current < number && !this.timer) {
      const offset = number - current;
      this.timer = setInterval(() => {
        this.setState({
          offset,
          current: this.state.current + 1,
          numbers: Counter.splitNumbers(this.state.current + 1, padding)
        })
      }, duration / offset);
    }

    if (current === number) {
      clearInterval(this.timer);
      this.timer = null;
    }

  };

  componentDidUpdate(props, state) {
    this.timerAction()
  }

  renderNum = (num, key) => {
    const current = parseInt(num) || 0;
    return (
      <Number key={key} current={current} duration={this.props.duration / this.state.offset}/>
    );
  };

  render() {
    const {numbers, current} = this.state;

    return (
      <div className="ui-counter">
        {numbers.map((num, index) => this.renderNum(num, index))}
        {/*<div style={{color: 'white'}}>{current}</div>*/}
      </div>
    );
  }
}
