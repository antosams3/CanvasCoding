import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Canvas3f from './Canvas3F';

import SideMenu from './Menus/SideMenu';
import * as React from 'react';

export default function CanvasContainer(props) {

    const [addMode, setAddMode] = React.useState(false);
    const [deleteMode, setDeleteMode] = React.useState(false);
    const [moveMode, setMoveMode] = React.useState(false);

    const [FPView, setFPView] = React.useState(false);
    const [selectObj, setSelectObj] = React.useState([]);

    return (<Grid container >
        <Grid item xs={10}>
            <Box sx={{ flexGrow: 1 }}>
                <Canvas3f addMode={addMode} selectObj={selectObj} setSelectObj={setSelectObj} FPView={FPView} deleteMode={deleteMode} setDeleteMode={setDeleteMode} setMoveMode={setMoveMode} moveMode={moveMode} />
            </Box>
        </Grid>
        <Grid item xs={2}>
            <SideMenu addMode={addMode} setAddMode={setAddMode} setDeleteMode={setDeleteMode} setMoveMode={setMoveMode} setSelectObj={setSelectObj} selectObj={selectObj} setFPView={setFPView} FPView={FPView} moveMode={moveMode} /> 
        </Grid>
    </Grid>)
}