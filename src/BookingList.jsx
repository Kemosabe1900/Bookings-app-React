import React from 'react';
import './App.css';

function BookingList({ bookings, onDelete }) {
    return (
        <ul>
            {bookings.map((booking) => (
                <li className="booking-card" key={booking.id}>
                    <div><strong>Name:</strong> {booking.name}</div>
                    <div><strong>Date:</strong> {booking.date}</div>
                    <div><strong>Time:</strong> {booking.time}</div>
                    <button onClick={() => onDelete(booking.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
}

export default BookingList;