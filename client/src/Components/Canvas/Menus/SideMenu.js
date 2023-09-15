import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import PanToolIcon from '@mui/icons-material/PanTool';
import PetsIcon from '@mui/icons-material/Pets';

export default function SideMenu(props) {
    const { mode, setMode, setSelectObj, selectObj, setFPView, FPView } = props;

    const handleAddClick = () => {
        !mode ? setMode('ADD') : setMode(null);
        setSelectObj([]);
    }

    return (<Stack spacing={1} direction="column">
        <FormControlLabel control={<Switch />} label="View" onClick={() => { setFPView(!FPView); }} />
        <FormControlLabel control={<Switch disabled={!Object.keys(selectObj).length ? false : true} onClick={() => { handleAddClick() }}/>} label="Add" />

        {mode === 'ADD' ?
            <>
                <Button variant={selectObj[0] === 'BOX' ? "outlined" : "text"} startIcon={<ViewInArIcon />} disabled={mode === 'ADD' ? false : true} onClick={() => { setSelectObj(['BOX']) }} > Box </Button>
                <Button variant={selectObj[0] === 'SPHERE' ? "outlined" : "text"} startIcon={<PanoramaFishEyeIcon />} disabled={mode === 'ADD' ? false : true} onClick={() => { setSelectObj(['SPHERE']) }} > Sphere </Button>
                <Button variant={selectObj[0] === 'RABBIT' ? "outlined" : "text"} startIcon={<PetsIcon />} disabled={mode === 'ADD' ? false : true} onClick={() => { setSelectObj(['RABBIT']) }} > Rabbit </Button>
            </>
            : Object.keys(selectObj).length ? /* If object selected  */
                <>
                    <Button variant={"text"} startIcon={<DeleteIcon />} onClick={() => { setMode('DEL'); }} > Delete </Button>
                    <Button variant={mode === 'MOVE' ? "outlined" : "text"} startIcon={<PanToolIcon />} onClick={() => { !mode ? setMode('MOVE') : setMode(null); }} > Move </Button>
                </>
                : ''}


    </Stack>)

}