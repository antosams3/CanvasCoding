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
    const [addSwitchValue, setAddSwitchValue] = React.useState(false);

    React.useEffect(() => {
        if (addSwitchValue) {
            if (mode === null || Object.keys(selectObj).length) {
                setAddSwitchValue(false);
            }
        }
    }, [mode, addSwitchValue, selectObj])

    const handleAddSwitchChange = () => {
        if (addSwitchValue === true) {
            setMode(null);
            setAddType([]);
            setAddSwitchValue(false);
        } else {
            setMode('ADD');
            setAddSwitchValue(true);
        }
    }

    return (<Stack spacing={1} direction="column">
        {/* View Mode selector */}
        <FormControlLabel
            control={
                <Switch
                    onClick={() => { setFPView(!FPView); }} />}
            label="View" />

        {/* Add mode selector */}
        <FormControlLabel
            control={
                <Switch
                    disabled={Object.keys(selectObj).length ? true : false}
                    checked={addSwitchValue}
                    onChange={handleAddSwitchChange}
                />}
            label="Add" />

        {Object.keys(selectObj).length ? /* If object selected  */
            <>
                <Button variant={"text"} startIcon={<DeleteIcon />} onClick={() => { setMode('DEL'); }} > Delete </Button>
                <Button variant={mode === 'MOVE' ? "outlined" : "text"} startIcon={<PanToolIcon />} onClick={() => { mode === 'MOVE'? setMode(null) : setMode('MOVE') }} > Move </Button>
            </>
            : mode === 'ADD' ?
                <>
                    <Button variant={addType[0] === 'BOX' ? "outlined" : "text"} startIcon={<ViewInArIcon />} disabled={mode === 'ADD' ? false : true} onClick={() => { !Object.keys(addType).length ? setAddType(['BOX']) : setAddType([]) }} > Box </Button>
                    <Button variant={addType[0] === 'SPHERE' ? "outlined" : "text"} startIcon={<PanoramaFishEyeIcon />} disabled={mode === 'ADD' ? false : true} onClick={() => { !Object.keys(addType).length ? setAddType(['SPHERE']) : setAddType([]) }} > Sphere </Button>
                </>

                : ''}


    </Stack>)

}