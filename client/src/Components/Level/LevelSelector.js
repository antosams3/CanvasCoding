import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

export default function LevelSelector(props) {
    const { level, handleClickDialog, disabled } = props;
    return (
        <Stack direction="row" spacing={1}>
            {level?.id !== 1 ?
                <Tooltip title="Previous level" onClick={() => { handleClickDialog(1, "Previous level?", "All the unsaved progress will be discarded. Are you sure?") }}>
                    <IconButton aria-label="prev">
                        <ArrowBackIcon />
                    </IconButton>
                </Tooltip>
                : ''}

            <Typography variant="body1" paddingTop={1}>
                Level {level?.id}
            </Typography>
            <span>
            <Tooltip title="Next level" onClick={() => { handleClickDialog(1, "Next level?", "All the unsaved progress will be discarded. Are you sure?") }}>
                <IconButton aria-label="next" disabled={disabled}>
                    <ArrowForwardIcon />
                </IconButton>
            </Tooltip>
            </span>
            
        </Stack>
    );
}