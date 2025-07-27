import React, { useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import BookingList from './BookingList';
import './App.css';
// import { data } from 'react-router-dom';

function bookingsReducer(state, action) {
    switch (action.type){
        case 'SET_BOOKINGS':
            return action.payload; 
        case 'ADD_BOOKING':
            return [...state, action.payload];
        case 'DELETE_BOOKING':
            return state.filter(booking => booking.id !== action.payload);
        case 'UPDATE_BOOKING':
            return state.map(booking => booking.id === action.payload.id ? action.payload : booking);
        default:
            return state;
    }
}

function BookingForm() {
    const[editingBooking,setEditingBooking] = useState(null);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [error, setError] = useState('');
    const nameRegex = /^[A-Za-z ]{2,}$/;
    // const isFirstRender = useRef(true); 

    const [bookings, dispatch] = useReducer(bookingsReducer,
        [],
        () => {
            const storedBookings = localStorage.getItem('bookings');
            return storedBookings ? JSON.parse(storedBookings) : [];
        }
    );


    useEffect(() => {
        localStorage.setItem('bookings', JSON.stringify(bookings));
    }, [bookings]);

    useEffect(() => {
        async function fetchBookings() {
            try{
                const response = await axios.get('http://localhost:3001/bookings');
                dispatch({ type: 'SET_BOOKINGS', payload: response.data }); // <-- PLURAL
                // setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        }
        fetchBookings();
    }, []);

    

    function handleEdit(booking){
        setEditingBooking(booking);
        setName(booking.name);
        setDate(booking.date);
        setTime(booking.time);
    }

    
    async function handleDelete(idToDelete) {
        console.log('Deleting booking with ID:', idToDelete);
        try {
        await axios.delete(`http://localhost:3001/bookings/${idToDelete}`);
        dispatch({ type: 'DELETE_BOOKING', payload: idToDelete });
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
        if(editingBooking){
            try{
                const updatedBooking = { 
                    ...editingBooking,
                    name,
                    date, 
                    time 
                };
                const response = await axios.put(
                    `http://localhost:3001/bookings/${editingBooking.id}`,
                    updatedBooking
                );
                dispatch({ type: 'UPDATE_BOOKING', payload: response.data });
                setEditingBooking(null);
                setName('');
                setDate('');
                setTime('');
                setError('');    
            } catch (error) {
                setError('Error updating booking');
                console.error('Error updating booking:', error);
            }
        }else{
            const newBooking = {name, date, time};
            try{
                const response = await axios.post('http://localhost:3001/bookings', newBooking);
                dispatch({ type: 'ADD_BOOKING', payload: response.data });
                setName('');
                setDate('');
                setTime('');
                setError('');
            } catch (error) {
                setError('Error creating booking');
                console.error('Error creating booking:', error);
            }
        }

    }


    return (
        <div>
           
            {error && <div style = {{color: 'red'}}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <h1>Booking Form</h1>
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
            <BookingList 
                bookings= {bookings} 
                onDelete = {handleDelete} 
                onEdit = {handleEdit}
            />
        </div> 
       
    );
}

export default BookingForm;


