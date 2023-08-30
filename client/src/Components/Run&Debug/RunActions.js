import * as React from 'react';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import BugReportIcon from '@mui/icons-material/BugReport';


export default function RunActions(props) {
    const { runStatus, setRunStatus } = props;      /* runStatus in: compiling, paused, debugging */

    return (<>
        <Button variant="contained" aria-label="Compile" disabled={runStatus === "paused" ? false : true} onClick={()=>{setRunStatus("compiling")}} ><PlayArrowIcon></PlayArrowIcon></Button>
        <Button variant="contained" aria-label="Pause" disabled={runStatus === "paused" ? true : false} onClick={()=>{setRunStatus("paused")}}><PauseIcon></PauseIcon></Button>
        <Button variant="contained" aria-label="Debug" disabled={runStatus === "paused" ? false : true} onClick={()=>{setRunStatus("debugging")}} ><BugReportIcon></BugReportIcon></Button>
    </>)
}