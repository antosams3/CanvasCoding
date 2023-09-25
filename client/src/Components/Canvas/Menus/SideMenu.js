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
            if (!mode || selectObj ) {                                  // Mode === null or selectObj !== null
                setAddSwitchValue(false);
            }
        }
    }, [mode, addSwitchValue, selectObj])

    const handleAddSwitchChange = () => {
        if (addSwitchValue === true) {
            setMode(null);
            setAddType(null);
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
                    disabled={selectObj? true : false}
                    checked={addSwitchValue}
                    onChange={handleAddSwitchChange}
                />}
            label="Add" />

        {selectObj ? /* If object selected (selectObj !== null)  */
            <>
                <Button variant={"text"} startIcon={<DeleteIcon />} onClick={() => { setMode('DEL'); }} > Delete </Button>
                <Button variant={mode === 'MOVE' ? "outlined" : "text"} startIcon={<PanToolIcon />} onClick={() => { mode === 'MOVE'? setMode(null) : setMode('MOVE') }} > Move </Button>
            </>
            : mode === 'ADD' ?
                <>
                    <Button variant={addType === 'BOX' ? "outlined" : "text"} startIcon={<ViewInArIcon />} disabled={mode === 'ADD' ? false : true} onClick={() => { addType === 'BOX' ? setAddType(null) : setAddType('BOX') }} > Box </Button>
                    <Button variant={addType === 'SPHERE' ? "outlined" : "text"} startIcon={<PanoramaFishEyeIcon />} disabled={mode === 'ADD' ? false : true} onClick={() => { addType === 'SPHERE' ? setAddType(null) : setAddType('SPHERE') }} > Sphere </Button>
                </>

                : ''}


    </Stack>)

}