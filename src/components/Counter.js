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
    value: PropTypes.number.isRequired,
    // Number_padding
    padding: PropTypes.number,
    // Update Duration
    duration: PropTypes.number,

    style: PropTypes.object
  };

  static defaultProps = {
    value: 0,
    padding: 8,
    duration: 1500,
    style: {
      fontSize: 100, 
      color: '#7de5ff' 
    }
  };

  state = {
    current: 0,
    offset: 1,
    numbers: [],
    prevProps: {},
    prevState: {},
  };

  static splitNumbers = (value, padding) => {
    const arr = value.toString().split('').map(v => parseInt(v));
    for (let i = arr.length; i < padding; i++) {
      arr.unshift(0);
    }
    return arr;
  };

  static getDerivedStateFromProps(props, state) {
    const newState = {};
    const {value, padding} = props;
    if (state.current !== value) {
      newState.current = value;
      newState.numbers = Counter.splitNumbers(value, padding)
    }

    return {
      ...state,
      ...newState
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      current: props.value,
      numbers: Counter.splitNumbers(props.value, props.padding)
    };
  }

  componentDidUpdate(props, state) {
    // this.timerAction()
  }

  renderNum = (num, key) => {
    const current = parseInt(num) || 0;
    return (
      <Number key={key} current={current} duration={this.props.duration}/>
    );
  };

  render() {
    const {numbers} = this.state;
    const {style} = this.props;

    return (
      <div className="ui-counter" style={style}>
        {numbers.map((num, index) => this.renderNum(num, index))}
      </div>
    );
  }
}
