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
        <div className="current">
          <div className="active" style={{
            transform: 'perspective(300px) rotateX(-80deg)',
          }}>
            <span>{current}</span>
            <div className="placeholder"/>
          </div>
          <div className="static">
            <div className="bottom">
              <span>{current}</span>
            </div>
          </div>
        </div>
        <div className="next">
          <div className="static">
            <span>{next}</span>
            <div className="segmentation"/>
          </div>
          <div className="active" style={{
            transform: 'perspective(300px) rotateX(70deg)',
          }}>
            <div className="placeholder"/>
            <div className="bottom">
              <span>{next}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}