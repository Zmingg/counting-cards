import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import './counter.scss';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

export default class extends Component {

  static propTypes = {
    current: PropTypes.number.isRequired
  };

  static defaultProps = {
    current: 0
  };

  state = {
    current: 0,
    rotate: false,
    prevProps: {}
  };

  static getDerivedStateFromProps(props, state) {
    const newState = {};
    const prevProps = state.prevProps;

    // Todo: ...

    return {
      ...state,
      ...newState
    }
  }

  componentDidUpdate(props, state) {

  }

  next = (current) => {
    return current + 1 < 10 ? current + 1 : 0;
  };

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
    const {current, rotate} = this.state;
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
                       timeout={400}
                       in={rotate}
                       // onEntered={() => this.setState({rotate: false})}
        >
          <div className="rotate current" style={{transform: 'perspective(500)'}}>
            <div className="top">
              <span>{current}</span>
            </div>
            <div className="placeholder"/>
          </div>
        </CSSTransition>

        <CSSTransition classNames="rotate-next"
                       timeout={400}
                       in={rotate}
                       onEntered={this.afterTransition}>
          <div className="rotate next">
            <div className="placeholder"/>
            <div className="bottom">
              <span>{next}</span>
            </div>
          </div>
        </CSSTransition>

        <button onClick={this.runTransition}>OK</button>

      </div>

    )
  }
}