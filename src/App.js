import React, { Component } from 'react';
import './css/App.css';
import Header from './Header';
import ReturnData from './ReturnData';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <ReturnData />
      </div>
    );
  }
}

export default App;
