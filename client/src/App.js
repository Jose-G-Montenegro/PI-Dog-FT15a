import React from 'react';
import { Route } from 'react-router';

import './App.css';

import Init from './components/Init/Init'
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import CreateDog from './components/CreateDog/CreateDog';
import SearchDogs from './components/SearchBar/SearchDogs';
import Detail from './components/Detail/Detail';

//import NewForm from './components/CreateDog/NewForm';


function App() {


  //  // search breeds
  //  const filterByName = useSelector(state => state.filterByName)
  //  console.log(filterByName)
  return (
    <div className="App">
      <Route exact path='/' component={Init} />
      <Route path='/dog' component={NavBar} />
      <Route exact path='/dog/home' component={Home} />
      <Route exact path="/dog/home/:id" component={Detail} />
      <Route exact path='/dog/createDog' component={CreateDog} />
      <Route exact path='/dog/search' component={SearchDogs} />
    </div>
  );
}

export default App;
