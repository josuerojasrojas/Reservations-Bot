import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <header className='box'>
        <h1>Reservation - Bot</h1>
        <p className='light-gray'>+13479707025</p>
        <p className='light-gray'>Text "Reservation for [name] at July 30, 2019 at 8pm"</p>
        <p className='lightest-gray'>Upcoming Reservations: {this.props.numReservations || 0}</p>
      </header>
    )
  }
}
