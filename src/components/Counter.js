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
    duration: 1500
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

  static getDerivedStateFromProps(props, state) {
    const newState = {};
    const {number, padding} = props;
    if (state.current !== number) {
      newState.current = number;
      newState.numbers = Counter.splitNumbers(state.current + 1, padding)
    }

    return {
      ...state,
      ...newState
    }
  }

  /**
   * 计时器
   **/
  // timerAction = () => {
  //   const {number, duration, padding} = this.props;
  //   const {current} = this.state;
  //   if (current < number && !this.timer) {
  //     const offset = number - current;
  //     this.timer = setInterval(() => {
  //       this.setState({
  //         offset,
  //         current: this.state.current + 1,
  //         numbers: Counter.splitNumbers(this.state.current + 1, padding)
  //       })
  //     }, duration / offset);
  //   }
  //
  //   if (current === number) {
  //     clearInterval(this.timer);
  //     this.timer = null;
  //   }
  //
  // };

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      current: props.number,
      numbers: Counter.splitNumbers(props.number, props.padding)
    };
  }

  componentDidUpdate(props, state) {
    // this.timerAction()
  }

  renderNum = (num, key) => {
    const current = parseInt(num) || 0;
    return (
      <Number key={key} current={current} duration={this.props.duration / (this.state.offset + 1)}/>
    );
  };

  render() {
    const {numbers, current} = this.state;

    return (
      <div className="ui-counter">
        {numbers.map((num, index) => this.renderNum(num, index))}
      </div>
    );
  }
}
