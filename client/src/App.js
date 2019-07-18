import React, { Component } from 'react';
import Header from './components/Header';
import './App.css';
import io from 'socket.io-client';
let socket = io('/')

import ReservationsList from './components/reservations/ReservationsList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      numReservations: 0,
    }
  }
  componentDidMount() {
    fetch('/reservations')
      .then(res => res.json())
      .then(reservations =>
        this.setState({ reservations: reservations, numReservations: reservations.length }
        ))
      // nothing happens in catch...
      .catch((e) => e);
    let $this = this;
    socket.on('reservations', function(data){
      let reservations = [ ...$this.state.reservations ];
      reservations.push(data);
      $this.setState({
        reservations: reservations,
        numReservations: $this.state.numReservations+1,
      });
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Header numReservations={this.state.numReservations}/>
        </div>
        <div className="reservation-list box">
          <ReservationsList reservations={this.state.reservations}/>
        </div>
      </div>
    );
  }
}

export default App;
