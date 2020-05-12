import React from 'react';
import './App.scss';
import HomePage from './components/homepage/HomePage';
import AppNavbar from './components/navbar/AppNavbar';

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <HomePage />
    </div>
  );
}

export default App;
