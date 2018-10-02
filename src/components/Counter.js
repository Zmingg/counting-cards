import React, {Component} from 'react';
import Number from './Number';
import PropTypes from 'prop-types';
import './counter.scss';

/**
 * Counting Card Component
 */
export default class extends Component {

  state = {
    current: [],
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
    return (
      <Number current={current} key={key}/>
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
