import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import './counter.scss';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

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

    if (prevProps.current !== props.current) {
      newState.rotate = true;
    }

    return {
      ...state,
      ...newState,
      prevProps: props
    }
  }

  componentDidMount() {

  }

  runTransition = () => {
    this.setState({
      rotate: true
    });
  };

  afterTransition = () => {
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
          {state => {
            return (
              <div className="rotate current" style={state === 'entering' ? {
                transitionDuration: duration / 2 + 'ms'
              } : null}>
                <div className="top">
                  <span>{current}</span>
                </div>
                <div className="placeholder"/>
              </div>
            )
          }}
        </CSSTransition>

        <CSSTransition classNames="rotate-next"
                       timeout={duration / 2}
                       in={rotate}
                       onEnter={this.afterTransition}>
          {state =>{
            console.log(state);
            return (
              <div className="rotate next" style={state === 'entering' ? {
                transitionDelay: duration / 2 + 'ms',
                transitionDuration: duration / 2 + 'ms'
              } : null}>
                <div className="placeholder"/>
                <div className="bottom">
                  <span>{next}</span>
                </div>
              </div>
            )
          }

          }
        </CSSTransition>

        <button onClick={this.runTransition}>add</button>

      </div>

    )
  }
}