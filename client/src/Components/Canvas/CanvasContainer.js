import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Canvas3f from './Canvas3F';

import SideMenu from './Menus/SideMenu';
import * as React from 'react';

export default function CanvasContainer(props) {

    const [addMode, setAddMode] = React.useState(false);
    const [FPView, setFPView] = React.useState(false);
    const [selectObj, setSelectObj] = React.useState([]);
    console.log(selectObj);

    return (<Grid container >
        <Grid item xs={10}>
            <Box sx={{ flexGrow: 1 }}>
                <Canvas3f addMode={addMode} selectObj={selectObj} setSelectObj={setSelectObj} FPView={FPView} />
            </Box>
        </Grid>
        <Grid item xs={2}>
            <SideMenu addMode={addMode} setAddMode={setAddMode} setSelectObj={setSelectObj} selectObj={selectObj} setFPView={setFPView} FPView={FPView} /> 
        </Grid>
    </Grid>)
}