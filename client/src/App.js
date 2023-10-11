import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import LoginForm from './Components/Auth/LoginForm';
import SignupForm from './Components/Auth/SignupForm';
import Homepage from './Components/Homepage';
import { useNavigate } from 'react-router-dom';
import API from './API/API';
import jwt from 'jwt-decode';
import { saveAs } from 'file-saver';
import gameProgressionChecker from './Utils/GameProgressionChecker';

const token = sessionStorage.getItem("jwtToken");

function App() {
  return (
    <Router>
      <Root />
    </Router>
  );
}

function Root() {
  const [loggedIn, setLoggedIn] = useState(token && jwt(token).exp > Math.floor(Date.now() / 1000) ? true : false);          /* Boolean user login status (true,false) */
  const [user, setUser] = useState(false);                  /* Logged user info */
  const [message, setMessage] = useState('');               /* Messages structure: severity, title, content */
  const [processing, setProcessing] = useState(false);      /* Api calls waiting animation */
  const [code, setCode] = useState("");                     // Code  
  const [gameSession, setGameSession] = useState();         // Game session                                        
  const [level, setLevel] = useState();                     // Game level
  const [step, setStep] = useState();                       // Game step
  const [levelSteps, setLevelSteps] = useState([]);         // Game level steps
  const [dialog, setDialog] = useState({});                 // Dialog content
  const [answer, setAnswer] = useState();                   // Dialog answer
  const [actionMenu, setActionMenu] = useState({});         // Action menu

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
  }, []);

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
      await API.logIn(credentials);
      const user = await API.getProfile();
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
    try {
      await API.putCode(code, gameSession);
      handleClickDialog(2, "Info", "Code saved successfully!");

    } catch (err) {
      handleMessage({ severity: "error", content: err })
    }
  }

  const initGame = async () => {
    try {
      const game_session = await API.getCurrentGameSession()                    // Retrieve current game session
      setGameSession(game_session)
      setCode(game_session.code)
      const game_step = await API.getStepById(game_session?.step_id)            // Retrieve Step details
      setStep(game_step)

      const game_level = await API.getLevelById(game_step?.level_id);           // Retrieve level details
      setLevel(game_level);
      const level_steps = await API.getStepsByLevelId(game_level.id);           // Retrieve level steps 
      setLevelSteps(level_steps);

      setActionMenu({
        stepNumber: game_step?.number,
        dialogue: game_step?.dialogue,
        action_menu: game_step?.action_menu
      })


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

  useEffect(() => {
    if (answer === true) {
      switch (dialog?.title) {
        case "Are you leaving?": handleLogout(); break;
        case "Restart level?": initGame(); break;
        default: break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer, dialog])

  const handleLogout = () => {
    setLoggedIn(false);
    sessionStorage.removeItem("jwtToken");
    setUser();
    setDialog({});
    setCode("");
    setStep();
    setLevel();
    setAnswer();
    setActionMenu({});
    setLevelSteps([]);
    setGameSession();
  }

  const handleProgressionChecker = async (addType, selectObj, objects, counter) => {
    if (!processing) {
      const nextGameSession = await gameProgressionChecker(addType, selectObj, objects, counter, code, step, levelSteps, handleMessage);
      if (nextGameSession) {
        setGameSession(nextGameSession)
        const game_step = await API.getStepById(nextGameSession?.step_id)         // Retrieve Step details
        setStep(game_step)

        if (game_step.level_id !== level.id) {                                        // Check level changed
          handleClickDialog(2, "Level completed", "Congratulations! You have completed the level " + level.id);
          const game_level = await API.getLevelById(game_step?.level_id);           // Retrieve level details
          setLevel(game_level);
          const level_steps = await API.getStepsByLevelId(game_level.id);           // Retrieve level steps 
          setLevelSteps(level_steps);
        }

        setActionMenu({
          stepNumber: game_step?.number,
          dialogue: game_step?.dialogue,
          action_menu: game_step?.action_menu
        })
      }
    }
  }

  const showUserInfo = () => {
    handleClickDialog(2, "Account", `Name: ${user?.name}  Surname: ${user?.surname} Email: ${user?.email} \n Level: ${level?.id}  Step:${step.id}`);
  }


  const handleExportFile = () => {
    handleClickDialog(2, "Code export", "Download will start immediately.");
    const formattedData = code.replace(/\n/g, '\n\n');
    const blob = new Blob([formattedData], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'exportedCode.txt');
  }


  const showLevelMission = () => {
    handleClickDialog(2, "Level info", level?.description);
  }

  const showLevelSteps = () => {
    var steps_description = "";
    levelSteps.forEach(levelstep => {
      steps_description += levelstep.number + ") " + levelstep.description;
      if (levelstep.description === step.description) {
        steps_description += " (CURRENT) \n"
      } else {
        steps_description += "\n"
      }
    })
    handleClickDialog(2, "Level steps", steps_description);

  }

  const showStepTips = () => {
    handleClickDialog(2, "Some tips", step.tip);
  }

  return (
    <Routes>
      <Route path='/' element={!loggedIn ? <Navigate replace to='/login' /> : <Navbar user={user} saveCode={saveCode} handleClickDialog={handleClickDialog} showUserInfo={showUserInfo} handleExportFile={handleExportFile} ></Navbar>}>
        {/* Outlets */}
        <Route path='/' element={!loggedIn ? <Navigate replace to='/login' /> : <Homepage code={code} setCode={setCode} level={level} step={step} dialog={dialog} handleClickDialog={handleClickDialog} setDialog={setDialog} setAnswer={setAnswer} showLevelMission={showLevelMission} showLevelSteps={showLevelSteps} actionMenu={actionMenu} showStepTips={showStepTips} handleProgressionChecker={handleProgressionChecker} />} />

      </Route>

      {/* The following routes will NOT have the navbar */}
      <Route path='/login' element={<LoginForm handleLogin={handleLogin} isloggedIn={loggedIn} message={message} setMessage={setMessage} processing={processing} />} />
      <Route path='/signup' element={<SignupForm signUp={handleSignUp} message={message} setMessage={setMessage} processing={processing} />} />
      <Route path='*' element={<><h1>Oh no! Page not found.</h1> <p>Return to our <Link to="/" >homepage</Link>. </p></>} />
    </Routes>
  );

}

export default App;
