import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LevelActions from './Level/LevelActions';
import LevelSelector from './Level/LevelSelector';
import { Tooltip, IconButton } from '@mui/material';
import SupportIcon from '@mui/icons-material/Support';

const defaultTheme = createTheme();

export default function Footer(props) {
    const { handleClickDialog, level, showLevelMission, showLevelSteps, showStepTips, disabled } = props;
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box
                component="footer"
                sx={{
                    py: 1,
                    px: 1,
                    mt: 'auto',
                    backgroundColor: (theme) =>
                        theme.palette.primary.main,
                }}
            >
                <Grid container justifyContent="space-between">
                    <Grid item >
                        <LevelActions handleClickDialog={handleClickDialog} showLevelMission={showLevelMission} showLevelSteps={showLevelSteps} />
                    </Grid>
                    <Grid item >
                        <LevelSelector handleClickDialog={handleClickDialog} level={level} disabled={disabled} />
                    </Grid>
                    <Grid item >
                            <Tooltip title="Tips">
                                <IconButton aria-label="restart" onClick={() => { showStepTips() }}>
                                    <SupportIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    );
}