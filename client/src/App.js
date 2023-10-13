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
import { Typography, Box, Icon, List, ListItem } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SupportIcon from '@mui/icons-material/Support';

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
  const [gameSession, setGameSession] = useState(null);     // Game session  
  const [level, setLevel] = useState(null);                 // Game level
  const [latestLevel, setLatestLevel] = useState(null);     // Game latest level
  const [step, setStep] = useState(null);                   // Game step
  const [levelSteps, setLevelSteps] = useState(null);       // Game level steps
  const [dialog, setDialog] = useState({});                 // Dialog content
  const [answer, setAnswer] = useState(false);              // Dialog answer
  const [actionMenu, setActionMenu] = useState({});         // Action menu
  const [disabled, setDisabled] = useState(false);          // Level selector 

  const navigate = useNavigate();

  const handleClickDialog = (type, title, content) => {
    setDialog({
      type: type,                                                             // Type in: 1 (question), 2 (info), 3 (upload), 4 (structured content)
      title: title,
      content: content
    })
  };

  useEffect(() => {

    if (level?.id !== null && latestLevel?.id !== null && loggedIn === true){

        if(level?.id < latestLevel?.id){
          setDisabled(false);
        }else{
          setDisabled(true);
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, latestLevel]);

  useEffect(() => {

    if (loggedIn === true && levelSteps !== null) {
      showWelcomeLevel()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelSteps]);

  useEffect(() => {
    if (answer === true) {
      switch (dialog?.title) {
        case "Are you leaving?": handleLogout(); break;
        case "Restart level?": initGame(); break;
        case "Previous level?": handleChangeLevel(true); break;
        case "Next level?": handleChangeLevel(false); break;
        default: break;
      }
      setAnswer(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer, dialog])

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
      const game_session = await API.getCurrentGameSession();                    // Retrieve current game session
      setGameSession(game_session);
      setCode(game_session.code);
      const game_step = await API.getStepById(game_session?.step_id);            // Retrieve Step details
      setStep(game_step);

      const game_level = await API.getLevelById(game_step?.level_id);           // Retrieve level details
      setLevel(game_level);
      setLatestLevel(game_level);
      const level_steps = await API.getStepsByLevelId(game_level.id);           // Retrieve level steps 
      setLevelSteps(level_steps);

      updateActionMenu(game_step);



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

  const handleChangeLevel = async (cond) => {
    try {
      let game_session;
      if(cond === true){
        game_session = await API.getPreviousLevel(step.id);
      }else{
        game_session = await API.getNextLevel(step.id);
      } 
      setGameSession(game_session)
      setCode(game_session.code)
      const game_step = await API.getStepById(game_session?.step_id)            // Retrieve Step details
      setStep(game_step)

      const game_level = await API.getLevelById(game_step?.level_id);           // Retrieve level details
      setLevel(game_level);
      const level_steps = await API.getStepsByLevelId(game_level.id);           // Retrieve level steps 
      setLevelSteps(level_steps);

      updateActionMenu(game_step);

    } catch (err) {
      handleMessage({ severity: "error", content: err })
    }
  }

  const handleProgressionChecker = async (addType, selectObj, objects, counter) => {
    if (!processing) {
      const nextGameSession = await gameProgressionChecker(addType, selectObj, objects, counter, code, step, levelSteps, handleMessage);
      if (nextGameSession) {
        setGameSession(nextGameSession)
        const game_step = await API.getStepById(nextGameSession?.step_id)         // Retrieve Step details
        setStep(game_step)

        if (game_step.level_id !== level.id) {                                        // Check level changed
          const game_level = await API.getLevelById(game_step?.level_id);           // Retrieve level details
          setLevel(game_level);
          const level_steps = await API.getStepsByLevelId(game_level.id);           // Retrieve level steps 
          setLevelSteps(level_steps);
        }

        updateActionMenu(game_step);

      }
    }
  }

  const updateActionMenu = (game_step) => {
    setActionMenu({
      stepNumber: game_step?.number,
      dialogue: game_step?.dialogue,
      action_menu: game_step?.action_menu
    })
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

  const showWelcomeLevel = () => {

    const structuredContent =
      <Box>
        <Typography variant="body1">
          <Icon component={InfoIcon} sx={{ fontSize: 20, marginRight: 1 }} />
          {level?.description}
        </Typography>
        <Typography variant="body1" marginTop={1}>
          <Icon component={ListAltIcon} sx={{ fontSize: 20, marginRight: 1 }} />
          {"This level has the following steps: "}
        </Typography>
        {getLevelSteps()}
        <Typography variant="body1" marginTop={2}>
          <Icon component={SupportIcon} sx={{ fontSize: 20, marginRight: 1 }} />
          {"If you have any doubts, you can access the suggestions by clicking the lifebuoy icon. Also, don't forget that you can always count on your professor!"}
        </Typography>
      </Box>
    if (level?.id !== null) {
      handleClickDialog(4, `Level ${level?.id}`, structuredContent);
    }
  }

  const getLevelSteps = () => {
    return (
      <List>
        {levelSteps.map((item, index) => (
          <ListItem key={index}>
            <Typography variant="body1" fontWeight={item.description === step.description ? "bold" : ""}>
              {`${index + 1}. ${item.description}`}
            </Typography>
          </ListItem>
        ))}
      </List>
    );
  }

  const showLevelSteps = () => {
    handleClickDialog(4, "Level steps", getLevelSteps());
  }

  const showStepTips = () => {
    handleClickDialog(2, "Some tips", step.tip);
  }

  return (
    <Routes>
      <Route path='/' element={!loggedIn ? <Navigate replace to='/login' /> : <Navbar user={user} saveCode={saveCode} handleClickDialog={handleClickDialog} showUserInfo={showUserInfo} handleExportFile={handleExportFile} ></Navbar>}>
        {/* Outlets */}
        <Route path='/' element={!loggedIn ? <Navigate replace to='/login' /> : <Homepage code={code} setCode={setCode} level={level} disabled={disabled} step={step} dialog={dialog} handleClickDialog={handleClickDialog} setDialog={setDialog} setAnswer={setAnswer} showLevelMission={showLevelMission} showLevelSteps={showLevelSteps} actionMenu={actionMenu} showStepTips={showStepTips} handleProgressionChecker={handleProgressionChecker} />} />

      </Route>

      {/* The following routes will NOT have the navbar */}
      <Route path='/login' element={<LoginForm handleLogin={handleLogin} isloggedIn={loggedIn} message={message} setMessage={setMessage} processing={processing} />} />
      <Route path='/signup' element={<SignupForm signUp={handleSignUp} message={message} setMessage={setMessage} processing={processing} />} />
      <Route path='*' element={<><h1>Oh no! Page not found.</h1> <p>Return to our <Link to="/" >homepage</Link>. </p></>} />
    </Routes>
  );

}

export default App;
