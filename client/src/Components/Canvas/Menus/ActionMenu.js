import React from 'react';
import { Typography, Paper } from '@mui/material';

export default function ActionMenu(props){
    const { actionMenu } = props;

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
          {actionMenu?.dialogue}
        </Typography>
      </Paper>
    );
}