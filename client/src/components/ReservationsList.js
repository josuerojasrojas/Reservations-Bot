import React from 'react';
import TimeLeft from './TimeLeft.js';
import { formatDate } from '../helpers/formattext';

class ReservationItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocus: false
    }
    this.handleFocus = this.handleFocus.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleFocus);
  }

  componentWillUnmount() {
    clearTimeout(this.clearTooltipTimer);
    document.removeEventListener('mousedown', this.handleFocus);
  }

  handleFocus(event){
    if (this.singleRes && !this.singleRes.contains(event.target)) {
      this.setState({ isFocus: false });
    }
  }

  setWrapperRef(item) {
    this.singleRes = item;
  }

  render() {
    return (
      <li
        key={`reservation-${this.props.i}`}
        onClick={ () => this.setState({isFocus: !this.state.isFocus}) }
        ref={this.setWrapperRef}>
        <div className='top-text space-between'>
          <span className='left'><span className='light-gray'>{this.props.i+1}.</span>  {this.props.res.name}</span>
          <span className='right light-gray'>{formatDate(this.props.res.datetime)}</span>
        </div>
        <div className={`bottom ${this.state.isFocus ? '' : 'hidden'}`}>
          <div className='more-info space-between'>
            <span className='left'><span className='hidden-text'>{this.props.i+1}.</span> Date Created</span>
            <span className='light-gray'>{formatDate(this.props.res.createdat)}</span>
          </div>
          <div className='more-info space-between'>
            <span className='left'><span className='hidden-text'>{this.props.i+1}.</span> Via</span>
            <span className='light-gray'>{this.props.res.via}</span>
          </div>
          <div className='more-info space-between'>
            <span className='left'><span className='hidden-text'>{this.props.i+1}.</span> TimeLeft</span>
            <span className='light-gray'>{!this.state.isFocus ? '0' : (<TimeLeft date={this.props.res.datetime}/>)}</span>
          </div>
        </div>
      </li>
    )
  }
}

export default class ReservationsList extends React.Component {
  createReservationItem (reservations) {
    let reservations_list = [ ...reservations ];
    reservations_list.sort((a, b) => {
      return Date.parse(a.datetime) - Date.parse(b.datetime);
    });
    return reservations_list.map((res, i) => (
      <ReservationItem
        key={`res-item-${i}`}
        i={i}
        res={res}/>
    ));
  }

  render() {
    return(
      <div className='reservationlist'>
        <ol>
          { this.createReservationItem(this.props.reservations) }
        </ol>
      </div>
    )
  }
}
