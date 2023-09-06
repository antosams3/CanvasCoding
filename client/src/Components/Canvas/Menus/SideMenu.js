import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function SideMenu(props) {
    const {addMode, setAddMode, setSelectObj, selectObj} = props;

    return (<Stack spacing={1} direction="column">
        <FormControlLabel control={<Switch />} label="Add" onClick={()=>{ setAddMode(!addMode); setSelectObj([]); }} />
        <Button variant={selectObj[0] === 'BOX'? "outlined": "text" } startIcon={<ViewInArIcon />} disabled={addMode? false : true} onClick={()=>{ setSelectObj(['BOX'])}} > Box </Button>
        <Button variant={selectObj[0] === 'SPHERE'? "outlined": "text" } startIcon={<PanoramaFishEyeIcon />} disabled={addMode? false : true} onClick={()=>{ setSelectObj(['SPHERE'])}} > Sphere </Button>
    </Stack>)

}