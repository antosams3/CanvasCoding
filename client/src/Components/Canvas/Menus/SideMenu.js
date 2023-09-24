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
    const { mode, setMode, setAddType, addType, setFPView, FPView, selectObj } = props;

    const handleAddClick = () => {
        !mode ? setMode('ADD') : setMode(null);
        if(Object.keys(addType).length > 0){
            setAddType([]);
        }
    }

    return (<Stack spacing={1} direction="column">
        <FormControlLabel control={<Switch />} label="View" onClick={() => { setFPView(!FPView); }} />
        <FormControlLabel control={<Switch disabled={!Object.keys(addType).length ? false : true} onClick={() => { handleAddClick() }} />} label="Add" />

        {mode === 'ADD' ?
            <>
                <Button variant={addType[0] === 'BOX' ? "outlined" : "text"} startIcon={<ViewInArIcon />} disabled={mode === 'ADD' ? false : true} onClick={() => { !Object.keys(addType).length ? setAddType(['BOX']) : setAddType([]) }} > Box </Button>
                <Button variant={addType[0] === 'SPHERE' ? "outlined" : "text"} startIcon={<PanoramaFishEyeIcon />} disabled={mode === 'ADD' ? false : true} onClick={() => { !Object.keys(addType).length ? setAddType(['SPHERE']) : setAddType([]) }} > Sphere </Button>
            </>
            : Object.keys(selectObj).length ? /* If object selected  */
                <>
                    <Button variant={"text"} startIcon={<DeleteIcon />} onClick={() => { setMode('DEL'); }} > Delete </Button>
                    <Button variant={mode === 'MOVE' ? "outlined" : "text"} startIcon={<PanToolIcon />} onClick={() => { !mode ? setMode('MOVE') : setMode(null); }} > Move </Button>
                </>
                : ''}


    </Stack>)

}