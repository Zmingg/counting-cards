import React, {Component, Fragment} from 'react';
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
    current: 0,
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

    if (prevProps.current === undefined && props.current !== undefined) {
      newState.current = props.current;
    }

    if (prevProps.current !== undefined && prevProps.current !== props.current) {
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
    if (!this.state.rotate && props.current !== this.state.current) {
      this.timerAction();
    }

    if (this.timer && props.current === this.state.current) {
      clearInterval(this.timer);
      this.timer = null;
      this.setState({
        rotate: false
      })
    }
  }

  timerAction = () => {
    const props = this.props;
    const {current, duration} = this.state;
    if (!this.timer && current !== props.current) {
      // const offset = props.current > this.state.current
      //   ? props.current - this.state.current
      //   : 10 + props.current - this.state.current;
      this.timer = setInterval(() => {
        this.setState({
          // duration: props.duration / offset,
          rotate: true
        })
      }, duration);
    }

  };

  next(num) {
    return num + 1 >= 10 ? 0 : num + 1;
  }

  runTransition = () => {
    this.setState({
      rotate: true
    });
  };

  afterTransition = () => {
    this.setState({
      rotate: false,
      current: this.next(this.state.current)
    });
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
          <div className="bottom">
            <span>{current}</span>
          </div>
        </div>

        <CSSTransition classNames="rotate-current"
                       timeout={duration}
                       in={rotate}>
          <div className="rotate current" style={{
            transitionDuration: (rotate ? duration / 2 : 0) + 'ms',
          }}>
            <div className="top">
              <span>{current}</span>
            </div>
            <div className="placeholder"/>
          </div>
        </CSSTransition>

        <CSSTransition classNames="rotate-next"
                       timeout={duration}
                       onEntered={this.afterTransition}
                       in={rotate}>
          <div className="rotate next" style={{
            transitionDelay: (rotate ? duration / 2 : 0) + 'ms',
            transitionDuration: (rotate ? duration / 2 : 0) + 'ms',
          }}>
            <div className="placeholder"/>
            <div className="bottom">
              <span>{next}</span>
            </div>
          </div>
        </CSSTransition>

        {/*<button onClick={this.runTransition}>add</button>*/}

      </div>

    )
  }
}