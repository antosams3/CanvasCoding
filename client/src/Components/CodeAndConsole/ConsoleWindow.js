import React from 'react';
import { Typography, Paper, Box, CircularProgress } from '@mui/material';
import { getConsoleOutput } from "../../Utils/CodeConsoleUtils";

export default function ConsoleWindow(props) {
  const { output, compiling } = props;

  const titleStyle = {
    background: 'linear-gradient(to right, #1e293b, #1e293b)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    display: 'inline',
    fontWeight: 'bold',
    fontSize: '1rem',
  };

  return (
    <Paper elevation={2} sx={{ backgroundColor: '#ededed', borderRadius: '4px', color: 'white', height: '100px', overflowY: 'auto', padding: '10px', position: 'relative' }}>
      <Typography variant="subtitle1" sx={titleStyle}>
        Output
      </Typography>
      {output ? <>{getConsoleOutput(output)}</> : null}
      {compiling ?
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <CircularProgress />
        </Box> : ''}
    </Paper>
  );

}
