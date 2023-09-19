import { React, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import LoginForm from './Components/Auth/LoginForm';
import SignupForm from './Components/Auth/SignupForm';
import Homepage from './Components/Homepage';
import { useNavigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Root />
    </Router>
  );
}

function Root() {
  const [loggedIn, setLoggedIn] = useState(false);          /* Boolean user login status (true,false) */
  //const [loggedUser, setLoggedUser] = useState(false);    /* Logged user info */
  const [message, setMessage] = useState('');               /* Messages for login */


  const navigate = useNavigate();


  const handleLogin = async (credentials) => {
    try {
      //const user = await API.logIn(credentials);
      //setLoggedUser(user);
      setLoggedIn(true);
      navigate('/');

    } catch (err) {
      const obj = JSON.parse(err);
      setMessage({ msg: `${obj.error}!`, type: 'error' });
    }
  }

  const handleSignUp = async (credentials) => {

  }

  const handleLogout = async () => {

  }



  return (
    <Routes>

      <Route path='/' element={!loggedIn ? <Navigate replace to='/login' /> : <Navbar handleLogout={handleLogout} ></Navbar>}>
        {/* Outlets */}
        <Route path='/' element={!loggedIn ? <Navigate replace to='/login' /> : <Homepage loggedIn={loggedIn} />} />

      </Route>

      {/* The following routes will NOT have the navbar */}
      <Route path='/login' element={<LoginForm login={handleLogin} isloggedIn={loggedIn} message={message} setMessage={setMessage} />} />
      <Route path='/signup' element={<SignupForm signUp={handleSignUp} message={message} setMessage={setMessage} />} />
      <Route path='*' element={<><h1>Oh no! Page not found.</h1> <p>Return to our <Link to="/" >homepage</Link>. </p></>} />
    </Routes>
  );

}

export default App;
