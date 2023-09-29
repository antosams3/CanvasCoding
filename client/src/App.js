import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import LoginForm from './Components/Auth/LoginForm';
import SignupForm from './Components/Auth/SignupForm';
import Homepage from './Components/Homepage';
import { useNavigate } from 'react-router-dom';
import API from './API/API';
import jwt from 'jwt-decode';

function App() {
  return (
    <Router>
      <Root />
    </Router>
  );
}

function Root() {
  const [loggedIn, setLoggedIn] = useState(false);          /* Boolean user login status (true,false) */
  const [user, setUser] = useState(false);                  /* Logged user info */
  const [message, setMessage] = useState('');               /* Messages structure: severity, title, content */


  const navigate = useNavigate();

  const handleMessage = (message) => {
    if (message.severity === "error") {
        if (message.content.error) {
            message.title = null;
            message.content = message.content.error;
        } else if (message.content.title) {
            message.title = message.content.title
            message.content = message.content.detail;
        }
    }
    setMessage({severity: message.severity, title: message.title, content: message.content});
}

const clearMessage = () => setMessage({});

  useEffect(() => {

    const init = () => {
        const token = sessionStorage.getItem("jwtToken");
        if (token && jwt(token).exp > Math.floor(Date.now()/1000)) {
            API.getProfile(jwt(token).email)
                .then(user => {
                    setUser(user)
                    setLoggedIn(true)
                })
                .catch(err => handleMessage({severity: "error", content: err}))
        } else {
            setUser()
            setLoggedIn(false)
            if(token && jwt(token).exp <= Math.floor(Date.now()/1000)){
                handleMessage({severity: "warning", content: "Your session has expired, login again"})
            }
        }
    }

    init();

}, []);

  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setUser(user);
      setLoggedIn(true);
      clearMessage();
      navigate('/');

    } catch (err) {
      handleMessage({severity: "error", content: err})
      //setMessage({ msg: `${err.detail}!`, type: 'error' });
    }
  }

  const handleSignUp = async (credentials) => {
    try {
      await API.signUp(credentials);
      handleMessage({
        severity: "success",
        title: "Successfully registered",
        content: "Login for accessing the platform"
    });
    }catch (err){
      handleMessage({severity: "error", content: err});
    }
  }

  const handleLogout = async () => {

  }



  return (
    <Routes>

      <Route path='/' element={!loggedIn ? <Navigate replace to='/login' /> : <Navbar handleLogout={handleLogout} user={user} ></Navbar>}>
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
