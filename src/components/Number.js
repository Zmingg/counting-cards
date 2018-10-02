import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './counter.scss';

export default class extends Component {

  static propTypes = {
    current: PropTypes.number.isRequired
  };

  static defaultProps = {
    current: 0
  };

  state = {
    next: 1,
    prevProps: {}
  };

  static getDerivedStateFromProps(props, state) {
    const newState = {};
    const prevProps = state.prevProps;
    if (props.current !== prevProps.current) {
      newState.next = props.current + 1 < 10 ? props.current + 1 : 0;
    }

    return {
      ...state,
      ...newState
    }
  }

  render() {
    const {className, current, ...rest} = this.props;
    const {next} = this.state;
    return (
      <div className={`counter-num ${className}`} {...rest}>

        <div className="static">
          <div className="top">
            <span>{next}</span>
          </div>
          <div className="segmentation"/>
          <div className="bottom">
            <span>{current}</span>
          </div>
        </div>

        <div className="rotate current" style={{
          transform: 'perspective(300px) rotateX(-80deg)'
        }}>
          <div className="top">
            <span>{current}</span>
          </div>
          <div className="placeholder"/>
        </div>

        <div className="rotate next" style={{
          transform: 'perspective(300px) rotateX(80deg)'
        }}>
          <div className="placeholder"/>
          <div className="bottom">
            <span>{next}</span>
          </div>
        </div>

      </div>
    )
  }
}