import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Movie from './components/movie';
import Customers from './components/customers';
import MovieForm from './components/movieForm';
import Rentals from './components/rentals';
import NotFound from './components/notFound'; 
import NavBar from './components/navBar';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerFrom';
import './App.css';

class App extends Component {

  render() { 
    return (
      <React.Fragment>
          <NavBar/>
          <main className='container'>
          <Routes>
            <Route path="/register" element={<RegisterForm/>}></Route>
            <Route path="/login" element={<LoginForm/>}></Route>
            <Route path="/movies/:id" element={<MovieForm/>} ></Route>
            <Route path="/movies" element={<Movie/>}></Route>
            <Route path="/customers" element={<Customers/>}></Route>
            <Route path="/rentals" element={<Rentals/>}></Route>
            <Route path="/not-found" element={<NotFound/>}></Route>
            <Route path="/" exact element={<Navigate to="/movies" replace />}> </Route>
            <Route path="*" element={<Navigate to="/not-found" replace />}> </Route>
          </Routes>                 
        </main>
      </React.Fragment>
    );
  }
}
 
export default App;


