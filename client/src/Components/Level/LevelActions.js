import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Tooltip from '@mui/material/Tooltip';

export default function LevelActions(props) {
    const { handleClickOpenDialog } = props;

    return (
        <Stack direction="row" spacing={1}>
            <Tooltip title="Restart">
                <IconButton aria-label="restart" onClick={() => { handleClickOpenDialog(1, "Restart level?", "By restarting the level, you will lose all the unsaved progress. Are you sure?") }}>
                    <RestartAltIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Mission">
                <IconButton aria-label="mission" onClick={() => { handleClickOpenDialog(2, "Info", "Level info...") }}>
                    <ListAltIcon />
                </IconButton>
            </Tooltip>
        </Stack>
    );
}