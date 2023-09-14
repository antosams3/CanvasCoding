import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import PanToolIcon from '@mui/icons-material/PanTool';

export default function SideMenu(props) {
    const { addMode, setAddMode, setSelectObj, selectObj, setFPView, FPView, setDeleteMode, setMoveMode, moveMode } = props;

    return (<Stack spacing={1} direction="column">
        <FormControlLabel control={<Switch />} label="View" onClick={() => { setFPView(!FPView); }} />
        <FormControlLabel control={<Switch />} label="Add" onClick={() => { setAddMode(!addMode); setSelectObj([]); }} />

        {addMode? 
        <>
        <Button variant={selectObj[0] === 'BOX' ? "outlined" : "text"} startIcon={<ViewInArIcon />} disabled={addMode ? false : true} onClick={() => { setSelectObj(['BOX']) }} > Box </Button>
        <Button variant={selectObj[0] === 'SPHERE' ? "outlined" : "text"} startIcon={<PanoramaFishEyeIcon />} disabled={addMode ? false : true} onClick={() => { setSelectObj(['SPHERE']) }} > Sphere </Button>
        </>
        : Object.keys(selectObj).length? /* If object selected  */
        <>
        <Button variant={"text"} startIcon={<DeleteIcon />} onClick={() => { setDeleteMode(true); }} > Delete </Button>
        <Button variant={moveMode? "outlined":"text"} startIcon={<PanToolIcon />} onClick={() => { setMoveMode(!moveMode); }} > Move </Button>
        </>
        : '' }
        
        
    </Stack>)

}