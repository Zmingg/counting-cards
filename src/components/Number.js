import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import './counter.scss';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

const debug = require('debug')('number');

export default class extends Component {

  static propTypes = {
    current: PropTypes.number.isRequired,
    duration: PropTypes.number
  };

  static defaultProps = {
    current: 0,
    duration: 100
  };

  state = {
    current: 0,
    rotate: false,
    prevProps: {}
  };

  static getDerivedStateFromProps(props, state) {
    const newState = {};
    const prevProps = state.prevProps;

    if (prevProps.current === undefined && props.current !== undefined) {
      newState.current = props.current;
    }

    if (prevProps.current !== undefined && prevProps.current !== props.current) {
      newState.rotate = true;
      debug('change rotate: true')
    }

    return {
      ...state,
      ...newState,
      prevProps: props
    }
  }

  componentDidMount() {
    debug('mount')
  }

  runTransition = () => {
    debug('run')
    this.setState({
      rotate: true
    });
  };

  afterTransition = () => {
    debug('stop')
    this.setState({
      rotate: false,
      current: this.props.current
    });
  };

  render() {
    const {className, duration, ...rest} = this.props;
    const {current, rotate} = this.state;
    const next = this.props.current;

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
                       timeout={duration / 2}
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

        <button onClick={this.runTransition}>add</button>

      </div>

    )
  }
}