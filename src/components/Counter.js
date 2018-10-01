import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './counter.scss';

/**
 * Counting Card Component
 */
export default class extends Component {

  state = {
    current: [1, 2, 3, 4, 5, 6],
    prevProps: {}
  };

  static propTypes = {
    // Current number
    number: PropTypes.number.isRequired,
    // Number_padding
    padding: PropTypes.number
  };

  static defaultProps = {
    number: 0,
    padding: 8
  };

  static getDerivedStateFromProps(props, state) {
    const newState = {};
    const prevProps = state.prevProps;
    if (props.number !== prevProps.number) {
      const arr = props.number.toString().split('');
      for (let i = arr.length; i < props.padding; i++) {
        arr.unshift(0);
      }
      newState.current = arr;
    }

    return {
      ...state,
      ...newState
    };
  }

  renderNum = (num, key) => {
    const current = parseInt(num) || 0;
    const next = current + 1 < 10 ? current + 1 : 0;

    return (
      <div className="counter-num" key={key}>
        <div className="top" style={{
          transform: 'perspective(300px) rotateX(-75deg)',
        }}>
          <span>{current}</span>
          <div className="placeholder"/>

        </div>
        <div className="segmentation"/>
        <div className="bottom">
          <span>{current}</span>
        </div>
        <div className="next top">
          <div className="placeholder"/>
          <span>{next}</span>
        </div>
      </div>
    );
  };

  render() {
    const {current} = this.state;

    return (
      <div className="ui-counter">
        {current.map((num, index) => this.renderNum(num, index))}
      </div>
    );
  }
}
