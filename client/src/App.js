import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './Components/Navbar';
import LoginForm from './Components/Auth/LoginForm';
import SignupForm from './Components/Auth/SignupForm';
import Homepage from './Components/Homepage';

function App() {
  return (
    <Router>
      <Root />
    </Router>
  );
}

function Root() {
  const [loggedIn, setLoggedIn] = useState(false);        /* Boolean user login status (true,false) */
  const [loggedUser, setLoggedUser] = useState(false);    /* Contains logged user info */
  const [message, setMessage] = useState('');             /* Contains Welcome messages for login */

  const handleLogin = async (credentials) => {
    
  }

  const handleSignUp = async (credentials) => {

  }

  const handleLogout = async () => {

  }
  
  return (
    <Routes>
      <Route path='/' element={<Navbar handleLogout={handleLogout} ></Navbar>}>
        {/* Outlets */}
        <Route path='' element={<Homepage />} />


      </Route>

      {/* The following routes will NOT have the navbar */}
      <Route path='/login' element={<LoginForm login={handleLogin} isloggedIn={loggedIn} message={message} setMessage={setMessage} />} />
      <Route path='/signup' element={<SignupForm signUp={handleSignUp} message={message} setMessage={setMessage} />} />
      <Route path='*' element={<><h1>Oh no! Page not found.</h1> <p>Return to our <Link to="/" >homepage</Link>. </p></>} />
    </Routes>
  );

}

export default App;
