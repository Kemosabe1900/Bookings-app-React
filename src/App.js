import './App.css';
import BookingForm from './BookingForm';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return <div>Home Page (placeholder)</div>;
}

function BookingDetails() {
  return <div>Booking Details (placeholder)</div>;
}

function BookingsPage() {
  return (
    <div>
      <BookingForm />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home  </Link>
        <Link to="/bookings">Bookings </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/bookings/:id" element={<BookingDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
