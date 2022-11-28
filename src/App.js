import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Layout/Home.js';
import Register from './components/auth/Register.js';
import Login from './components/auth/Login.js';
import Users from './components/auth/Users.js';
import CheckNetwork from './components/Layout/CheckNetwork.js';
import store from './store.js';
import { Provider } from 'react-redux';
import { loadUsers } from './actions/auth.js'
import setAuthToken from './helpers/setAuthToken.js';

if(localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {

  useEffect(() => {
    store.dispatch(loadUsers());
  }, [])

  const networkStatus = CheckNetwork();

  return (
    <Provider store={store}>
    <Router>
    <div>
    <div className="offline_reminder" hidden={networkStatus}>
      <p>You are offline! Please check your connection</p>
    </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </div>
    </Router>
    </Provider>
  );
}

export default App;
