import React, { Component } from 'react';
/*import logo from './logo.svg';*/
/*import './App.css';*/
import Header from './header/Header';
import Main from './main/Main';

const App = () => {
  console.log('API key: ', process.env.REACT_APP_TMDB_API_KEY);
  return (
    <div>
      <Header />
      <Main />
    </div>
  )
}
export default App;
