import * as React from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Fab, Tooltip, CircularProgress } from '@mui/material';
import { blue } from '@mui/material/colors';

export default function CompileButton(props) {
    const { compiling, handleCompile } = props;      /* runStatus in: compiling, paused, debugging */

    return (
        <Tooltip title={compiling? "Compiling": "Compile" }>
            <Fab color="primary" aria-label="Compile" disabled={compiling} onClick={() => { handleCompile(); }} >
                <PlayArrowIcon />
            </Fab>
            {compiling && (
          <CircularProgress
            size={68}
            sx={{
              position: 'absolute',
              top: -6,
              left: -6,
              zIndex: 1,
              color: blue[200]
            }}
          />
        )}
        </Tooltip>)
}