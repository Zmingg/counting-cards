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
    initial: PropTypes.number,
    value: PropTypes.number.isRequired,
    duration: PropTypes.number
  };

  static defaultProps = {
    initial: 0,
    value: 0,
    duration: 1000
  };

  state = {
    current: 0,
    next: 1,
    rotateStart: false,
    rotateEnd: false,
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

    if (prevProps.current === undefined && props.current !== undefined) {
      return {
        ...state,
        current: props.current,
        prevProps: props
      }
    }

    if (!state.rotateStart && state.rotateEnd) {
      return {
        ...state,
        prevProps: props
      }
    }

    if (state.current !== props.current) {
      newState.rotateStart = true;
      newState.rotateEnd = false;
      newState.duration = Number.duration(props.current, state.current, props.duration);
    }

    return {
      ...state,
      ...newState,
      prevProps: props
    }
  }

  componentDidUpdate(props, state) {
    const {rotateStart, rotateEnd} = this.state;
    if (!rotateStart && rotateEnd && this.state.current !== this.props.current) {
      setTimeout(() => {
        this.setState({
          rotateStart: true,
          rotateEnd: false
        })
      }, state.duration)
      
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
        rotateStart: false,
        rotateEnd: true,
        current: this.next(this.state.current)
      })
      clearTimeout(this.exitTimmer);
      this.exitTimmer = null;
    }, duration);
  };

  render() {
    const {className, ...rest} = this.props;
    const {current, rotateStart, rotateEnd, duration} = this.state;
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
                       in={rotateStart}>
          <div 
            className="rotate" 
            style={{
              transitionDuration: (rotateStart ? duration : 0) + 'ms',
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