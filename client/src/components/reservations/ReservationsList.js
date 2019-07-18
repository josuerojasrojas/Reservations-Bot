import React from "react";
import MediaCard from "../MediaCard";

export default class ReservationsList extends React.Component {
  render() {
    return (
      <div className="reservationlist">
        
        {this.props.reservations.sort((a, b) => {
          return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
        }).map((res, i) => (
          <MediaCard key={i} name={res.name} date={res.dateTime} />
        ))}
      </div>
    );
  }
}
