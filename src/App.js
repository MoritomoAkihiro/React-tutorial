import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  //renderで画面に表示する内容を記述している。
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>
            Edit <code>src/App.js</code> and save to reload.
          </h1>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Myapp
          </a>
        </header>
      </div>
    );
  }
}

export default App;
