import React from 'react';
import { formatTime } from '../helpers/formattext';

// a component that display time left from given date

export default class TimeLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      timerInterval: null,
    }
    this.timeLeft = this.timeLeft.bind(this);
  }

  timeLeft() {
    let now = (new Date()).getTime();
    let time = Date.parse(this.props.date) - now;
    this.setState({ time: time });
  }

  componentWillMount() {
    // run first time
    this.timeLeft();
    let timerInterval = setInterval(this.timeLeft, 1000);
    this.setState({ timerInterval: timerInterval });
  }

  componentWillUnmount() {
    clearInterval(this.state.timerInterval);
  }

  render() {
    return(
      <span className={this.props.className  || ''}>{formatTime(this.state.time)}</span>
    )
  }
}
