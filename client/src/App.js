import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import LoginForm from './Components/Auth/LoginForm';
import SignupForm from './Components/Auth/SignupForm';
import Homepage from './Components/Homepage';
import { useNavigate } from 'react-router-dom';
import API from './API/API';
import jwt from 'jwt-decode';

const token = sessionStorage.getItem("jwtToken");

function App() {
  return (
    <Router>
      <Root />
    </Router>
  );
}

function Root() {
  const [loggedIn, setLoggedIn] = useState(token && jwt(token).exp > Math.floor(Date.now() / 1000)? true : false);          /* Boolean user login status (true,false) */
  const [user, setUser] = useState(false);                  /* Logged user info */
  const [message, setMessage] = useState('');               /* Messages structure: severity, title, content */
  const [processing, setProcessing] = useState(false);      /* Api calls waiting animation */
  const [code, setCode] = useState("");                     // Code  
  const [gameSession, setGameSession] = useState();         // Game session                                        
  const [level, setLevel] = useState();                     // Game level
  const [step, setStep] = useState();                       // Game step
  const [dialog, setDialog] = useState({});           // Dialog content

  const navigate = useNavigate();

  const handleClickDialog = (type, title, content) => {
    setDialog({
        type: type,                                                             // Type in: 1 (question), 2 (info)
        title: title,
        content: content
    })
};

  useEffect(() => {

    init();
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const init = () => {
    if (token && jwt(token).exp > Math.floor(Date.now() / 1000)) {
      // Token not expired 
      API.getProfile()
        .then(user => {
          setUser(user)
          initGame();
        })
        .catch(err => handleMessage({ severity: "error", content: err }))

    } else {
      // User not logged (token not found)
      setUser()
      setLoggedIn(false)
      // Token found but expired
      if (token && jwt(token).exp <= Math.floor(Date.now() / 1000)) {
        handleMessage({ severity: "warning", content: "Your session has expired, login again" })
      }
    }
  }

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
    setMessage({ severity: message.severity, title: message.title, content: message.content });
  }

  const handleLogin = async (credentials) => {
    try {
      setProcessing(true);
      const user = await API.logIn(credentials);
      setUser(user);
      setLoggedIn(true);

      await initGame();
      setProcessing(false);
      navigate('/');


    } catch (err) {
      setProcessing(false);
      handleMessage({ severity: "error", content: err })
      //setMessage({ msg: `${err.detail}!`, type: 'error' });
    }
  }

  const saveCode = async () => {
    try{
      await API.putCode(code,gameSession);
      handleClickDialog(2, "Info", "Code saved successfully!");

    }catch(err){
      handleMessage({ severity: "error", content: err })
    }
  }

  const initGame = async () => {
    try {
      const game_session = await API.getCurrentGameSession()
      setGameSession(game_session)
      setCode(game_session.code)
      const game_step = await API.getStepById(game_session.step_id)
      setStep(game_step)
      const game_level = await API.getLevelById(game_step.level_id)
      setLevel(game_level);
    } catch (err) {
      handleMessage({ severity: "error", content: err })
    }
  }

  const handleSignUp = async (credentials) => {
    try {
      setProcessing(true);
      await API.signUp(credentials);
      handleMessage({
        severity: "success",
        title: "Successfully registered",
        content: "Login for accessing the platform"
      });
      setProcessing(false);

    } catch (err) {
      setProcessing(false);
      handleMessage({ severity: "error", content: err });
    }
  }

  const handleLogout = async () => {
    setLoggedIn(false);
    sessionStorage.removeItem("jwtToken");
    setUser();
  }



  return (
    <Routes>

      <Route path='/' element={!loggedIn ? <Navigate replace to='/login' /> : <Navbar handleLogout={handleLogout} user={user} saveCode={saveCode} handleClickDialog={handleClickDialog}  ></Navbar>}>
        {/* Outlets */}
        <Route path='/' element={!loggedIn ? <Navigate replace to='/login' /> : <Homepage code={code} setCode={setCode} level={level} step={step} dialog={dialog} handleClickDialog={handleClickDialog} />} />

      </Route>

      {/* The following routes will NOT have the navbar */}
      <Route path='/login' element={<LoginForm login={handleLogin} isloggedIn={loggedIn} message={message} setMessage={setMessage} processing={processing} />} />
      <Route path='/signup' element={<SignupForm signUp={handleSignUp} message={message} setMessage={setMessage} processing={processing} />} />
      <Route path='*' element={<><h1>Oh no! Page not found.</h1> <p>Return to our <Link to="/" >homepage</Link>. </p></>} />
    </Routes>
  );

}

export default App;
