import React, { Component } from 'react';
import './App.css';
import CalendarFrame from './components/CalendarFrame'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <CalendarFrame/>
        </header>
      </div>
    );
  }
}

export default App;
