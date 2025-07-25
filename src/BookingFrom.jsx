import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import BookingList from './BookingList';
import './App.css';

function BookingForm() {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [error, setError] = useState('');
    const nameRegex = /^[A-Za-z ]{2,}$/;
    // const isFirstRender = useRef(true); 


    const [bookings, setBookings] = useState(() =>{
        const storedBookings = localStorage.getItem('bookings');
        console.log('Load from localStorage: ', storedBookings);
        return storedBookings ? JSON.parse(storedBookings) : [];
    })


    useEffect(() => {
        localStorage.setItem('bookings', JSON.stringify(bookings));
    }, [bookings]);

    useEffect(() => {
        async function fetchBookings() {
            try{
                const response = await axios.get('http://localhost:3001/bookings');
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        }
        fetchBookings();
    }, []);

    

    
    async function handleDelete(idToDelete) {
        console.log('Deleting booking with ID:', idToDelete);
        try {
        await axios.delete(`http://localhost:3001/bookings/${idToDelete}`);
        setBookings(bookings.filter(booking => booking.id !== idToDelete));
       } catch (error) {
         console.error('Error deleting booking:', error);
       }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!nameRegex.test(name)) {
            setError('Name must be at least 2 letters and contain only letters and spaces');
            return;
        }
        if (!name || !date || !time) {
            setError('All fields are required!');
            return;
        }
        const today = new Date().toISOString().split('T')[0];
        if (date < today) {
            setError('Cannot schedule booking for the past.');
            return;
        }
        setError('');
        const newBooking = { name, date, time };

        try { 
            const response = await axios.post('http://localhost:3001/bookings', newBooking);
            setBookings([...bookings, response.data]); 
            setName('');
            setDate('');
            setTime('');
            setError('');
        } catch (error) {
            setError('Error creating booking');
            console.error('Error creating booking:', error);
        }
    }


    return (
        <div>
            <h1>Booking Form</h1>
            {error && <div style = {{color: 'red'}}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name: </label>
                    <input  
                    type = "text"
                    value = {name}
                    onChange = {e => {setName(e.target.value);
                        if(e.target.value && date && time) setError('')
                    }}
                   />
                </div>
                <div>
                    <label>Date: </label>
                    <input
                    type = "date"
                    value = {date}
                    onChange = {e => {
                        setDate(e.target.value);
                        if(name && e.target.value && time) setError('')
                    }}
                    />
                </div>
                <div>
                    <label>Time: </label>
                    <input
                    type = "time"
                    value = {time}
                    onChange={e => {
                        setTime(e.target.value);
                        if (name && date && e.target.value) setError('');
                      }}
                    />
                </div>
                <div>
                    <button type="submit">Add Booking</button>
                </div>
                
            </form>
            <BookingList bookings= {bookings} onDelete = {handleDelete}/>
        </div> 
       
    );
}

export default BookingForm;


