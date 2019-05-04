import React, {Component, Fragment} from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';
import './counter.scss';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

const debug = require('debug')('number');

export default class Number extends Component {

  static propTypes = {
    current: PropTypes.number.isRequired,
    duration: PropTypes.number
  };

  static defaultProps = {
    current: 0,
    duration: 1000
  };

  state = {
    current: 1,
    rotate: false,
    duration: 1000,
    prevProps: {}
  };

  static duration = (next, current, totalDuration = 1000) => {
    const offset = next > current
      ? next - current
      : 10 + next - current;
    return totalDuration / offset;
  };

  static getDerivedStateFromProps(props, state) {
    const newState = {};
    const prevProps = state.prevProps;

    // if (prevProps.current === undefined && props.current !== undefined) {
    //   newState.current = props.current;
    // }

    if (!state.rotate && state.current !== props.current) {
      newState.rotate = true;
      newState.duration = Number.duration(props.current, prevProps.current, props.duration);
    }

    return {
      ...state,
      ...newState,
      prevProps: props
    }
  }

  componentDidUpdate(props, state) {
    if (!this.state.rotate && this.state.current !== this.props.current) {
      this.setState({
        rotate: true
      })
    }
  }

  next(num) {
    return num + 1 >= 10 ? 0 : num + 1;
  }
  
  afterTransition = () => {
    const {current, duration} = this.state;

    if (this.exitTimmer) return;

    this.exitTimmer = setTimeout(() => {
      this.setState({
        rotate: false,
        current: this.next(current)
      })
      clearTimeout(this.exitTimmer);
      this.exitTimmer = null;
    }, duration);
  };

  render() {
    const {className, ...rest} = this.props;
    const {current, rotate , duration} = this.state;
    const next = this.next(current);

    return (
      <div className={`counter-num ${className}`} {...rest}>

        <div className="static">
          <div className="top">
            <span>{next}</span>
          </div>
          <div className="segmentation"/>
          <div className="segmentation"/>
          <div className="bottom">
            <span>{current}</span>
          </div>
        </div>

        <CSSTransition classNames="rotate"
                       timeout={0}
                       onEntered={this.afterTransition}
                       in={rotate}>
          <div 
            className="rotate" 
            style={{
              transitionDuration: (rotate ? duration : 0) + 'ms',
            }}
          >
            {/* <div className="top"> */}
              <div className="current">
                <div className="top">
                  <span>{current}</span>
                </div>
                <div className="placeholder"/>
              </div>
              
              <div className="next">
                <div className="placeholder"/>
                <div className="bottom">
                  <span>{next}</span> 
                </div>
                 
              </div>
        
          </div>
        </CSSTransition>

      </div>

    )
  }
}