import * as React from 'react';
import { Grid } from "@mui/material";
import Footer from "./Footer";
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import CustomDialog from './CustomDialog';
import CanvasContainer from './Canvas/CanvasContainer';

export default function Homepage(props) {
    //const { loggedIn } = props;
    const [openDialog, setOpenDialog] = React.useState(false);                      // Dialog
    const [type, setType] = React.useState(1);
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");

    const handleClickOpenDialog = (type, title, content) => {
        setType(type);
        setTitle(title);
        setContent(content);
        setOpenDialog(true);
    };

    return (
        <Box sx={{ position: 'relative', minHeight: '100vh' }}>
            <Grid container spacing={0.5}>

                {/* Dialog */}
                <CustomDialog openDialog={openDialog} setOpenDialog={setOpenDialog} type={type} title={title} content={content}  ></CustomDialog>

                {/* Code and console */}
                <Grid item xs={7}>
                    <Box>
                        <Typography variant="body1" gutterBottom>
                            body1. Code and console
                        </Typography>
                    </Box>

                </Grid>

                {/* Canvas, side and action menu */}
                <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column', position: 'relative', height: '100%' }}>
                    <CanvasContainer></CanvasContainer>
                </Grid>

                {/* Footer */}
                <Grid item xs={12}>
                    <Box
                        sx={{
                            position: 'fixed',  // Posizione fissa per il footer
                            bottom: 0,          // Posiziona il footer in fondo alla pagina
                            width: '100%',      // Assicura che il footer abbia larghezza completa
                            backgroundColor: theme =>
                                theme.palette.primary.main
                        }}
                    >
                        <Footer handleClickOpenDialog={handleClickOpenDialog} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}