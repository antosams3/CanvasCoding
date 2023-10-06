import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

export default function LevelSelector(props) {
    const { level, handleClickDialog } = props;
    return (
        <Stack direction="row" spacing={1}>
            {level?.id !== 1 ?
                <Tooltip title="Previous level" onClick={() => { handleClickDialog(1, "Warning", "By selecting the previous level, you will lose all the unsaved progress. Are you sure?") }}>
                    <IconButton aria-label="prev">
                        <ArrowBackIcon />
                    </IconButton>
                </Tooltip>
                : ''}

            <Typography variant="body1" paddingTop={1}>
                Level {level?.id}
            </Typography>
            <Tooltip title="Next level">
                <IconButton aria-label="next">
                    <ArrowForwardIcon />
                </IconButton>
            </Tooltip>
        </Stack>
    );
}