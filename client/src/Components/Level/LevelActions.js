import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';

export default function LevelActions(props) {
    const { handleClickDialog, showLevelMission, showLevelSteps } = props;

    return (
        <Stack direction="row" spacing={1}>
            <Tooltip title="Restart">
                <IconButton aria-label="restart" onClick={() => { handleClickDialog(1, "Restart level?", "By restarting the level, you will lose all the unsaved progress. Are you sure?") }}>
                    <RestartAltIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Level info">
                <IconButton aria-label="info" onClick={() => { showLevelMission(); }}>
                    <InfoIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Level steps">
                <IconButton aria-label="step" onClick={() => { showLevelSteps(); }}>
                    <ListAltIcon />
                </IconButton>
            </Tooltip>
        </Stack>
    );
}