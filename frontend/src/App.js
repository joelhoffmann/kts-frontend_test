
import React from 'react';
import Footer from './components/Footer';
import logo from './logo.svg';
import {
  Routes,
  Route,
  Link  
} from 'react-router-dom'
import About from './About'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Button from 'react-bootstrap/Button'

import Movie from './components/Movie'
import Headerbar from './components/Headerbar'

import Container from 'react-bootstrap/Container'

import Startpage from './components/Startpage'
import MovieDetails from './components/MovieDetails';
import Admin from './components/Admin';
import AdminManagement from './components/AdminManagement';
import Scanner from './components/Scanner';
import BookingData from './components/BookingData';
import AddMovie from './components/AddMovie';
import Mitarbeiterrabatt from './components/Mitarbeiterrabatt';
import BookingConfirmation from './components/BookingConfirmation';
import SeatSelection from './components/SeatSelection';

function App() {
  const [data, setData] = React.useState(null);

  return (
    <Container fluid> 
    <div className="App">
      <header className="App-header">
      <Headerbar/>
        <Routes>
          <Route exact path="/" element={<Startpage/>}></Route>
          <Route exact path="/about" element={<About/>}></Route>
          <Route exact path="/movie/:moviename" element={<MovieDetails />}></Route>
          
          <Route exact path="/admin" element={<Admin/>}></Route>
          <Route exact path="/admin/management" element={<AdminManagement/>}></Route>
          <Route exact path="/admin/management/scanner" element={<Scanner/>}></Route>
          <Route exact path="/checkout" element={<BookingData />}></Route>
          <Route exact path="/bookingConfirmation" element={<BookingConfirmation/>}></Route>
          <Route exact path="/SeatSelection" element={<SeatSelection />}></Route>
          <Route exact path="/admin/management/addMovie" element={<AddMovie/>}></Route>
          <Route exact path="/admin/management/mitarbeiterrabatt" element={<Mitarbeiterrabatt/>}></Route>
        </Routes>
      </header>
    </div>
 <Footer />
    </Container>
  );
}

export default App;
