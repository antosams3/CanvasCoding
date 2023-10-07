import * as React from 'react';
import SyncIcon from '@mui/icons-material/Sync';
import { Fab, Tooltip } from '@mui/material';

export default function SyncButton(props) {
  const { compiling, handleSync } = props;      /* runStatus in: compiling, paused, debugging */

  return (<>
    <Tooltip title="Sync canvas with code" disabled={compiling}>
      <span>
        <Fab color="secondary" aria-label="Sync" disabled={compiling} onClick={() => { handleSync(); }} >
          <SyncIcon />
        </Fab>
      </span>
    </Tooltip>
    </>
  )
}