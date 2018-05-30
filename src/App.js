import React, { Component } from 'react';
import './css/App.css';
import Header from './Header';
import ReturnData from './ReturnData';
import Credits from './Credits';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <ReturnData />
        <Credits />
      </div>
    );
  }
}

export default App;
