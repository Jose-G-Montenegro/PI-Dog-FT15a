import React from 'react';
import { Route } from 'react-router';

import './App.css';

import Init from './components/Init/Init'
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import CreateDog from './components/CreateDog/CreateDog';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Init} />
      <Route path='/dog' component={NavBar} />
      <Route exact path='/dog/home' component={Home} />
      <Route exact path='/dog/createDog' component={CreateDog} />
      <Route />
    </div>
  );
}

export default App;
