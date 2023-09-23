import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Canvas3f from './Canvas3F';

import SideMenu from './Menus/SideMenu';
import * as React from 'react';

export default function CanvasContainer(props) {
    const {setLoading, objects, setObjects, selectObj, setSelectObj} = props;
    const [mode, setMode] = React.useState(null); // Mode in: null, 'ADD', 'DEL', 'MOVE'
    const [FPView, setFPView] = React.useState(false);

    return (<Grid container >
        <Grid item xs={10}>
            <Box sx={{ flexGrow: 1 }}>
                <Canvas3f mode={mode} setMode={setMode} selectObj={selectObj} setSelectObj={setSelectObj} FPView={FPView} setLoading={setLoading} objects={objects} setObjects={setObjects}/>
            </Box>
        </Grid>
        <Grid item xs={2}>
            <SideMenu mode={mode} setMode={setMode} setSelectObj={setSelectObj} selectObj={selectObj} setFPView={setFPView} FPView={FPView} />
        </Grid>
    </Grid>)
}