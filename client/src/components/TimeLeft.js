import React from 'react';

// a component that display time left from given date and now

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

  formatTime(milli) {
    let days = Math.floor(milli / 86400000);
    milli -= days * 86400000;
    let hours = Math.floor(milli / 3600000);
    milli -= hours * 3600000;
    let minutes = Math.floor(milli / 60000);
    milli -= minutes * 60000;
    let seconds = Math.floor(milli / 1000);
    return `${days} Days ${hours > 9 ? hours : `0${hours}`}:${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`;
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
      <span className={this.props.className  || ''}>{this.formatTime(this.state.time)}</span>
    )
  }
}
