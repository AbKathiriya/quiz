import React, { Component } from 'react';
import './Home.css';
import logo from './logo.png';
import SearchBar from './SearchBar'

class Home extends Component {
  render() {
    return (
      <div className="home">
        <header className="home-header">
          <img src={logo} className="home-logo" alt="logo" />
          <div className="home-title">Fun IQ and Personality quizzes!</div>
        </header>
        <SearchBar/>
      </div>
    );
  }
}

export default Home;
