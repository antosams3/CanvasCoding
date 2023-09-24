import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid  from '@mui/material/Grid';
import LevelActions from './Level/LevelActions';
import LevelSelector from './Level/LevelSelector';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Footer(props) {
    const {handleClickDialog} = props;

    const level = { id: 7 };
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
                <Grid container>
                    <Grid item xs={6}>
                        <LevelActions handleClickDialog={handleClickDialog} />
                    </Grid>
                    <Grid item xs={6}>
                        <LevelSelector handleClickDialog={handleClickDialog} level={level} />
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    );
}