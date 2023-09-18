import React from 'react';
import { Typography, Paper } from '@mui/material';
import { getConsoleOutput } from "../../Utils/CodeConsoleUtils";

export default function ConsoleWindow(props) {
  const { output } = props;

  const titleStyle = {
    background: 'linear-gradient(to right, #1e293b, #1e293b)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    display: 'inline',
    fontWeight: 'bold',
    fontSize: '1rem',
  };

  return (
    <>
      <Paper elevation={3} sx={{ backgroundColor: '#ededed', borderRadius: '4px', color: 'white', height: '100px', overflowY: 'auto', padding: '10px' }} >
        <Typography variant="subtitle1" sx={titleStyle}>
          Output
        </Typography>
        {output ? <>{getConsoleOutput(output)}</> : null}
      </Paper>
    </>
  );

}
