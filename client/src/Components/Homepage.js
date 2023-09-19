import * as React from 'react';
import { Grid } from "@mui/material";
import Footer from "./Footer";
import Box from "@mui/material/Box";
import CustomDialog from '../Utils/CustomDialog';
import CanvasContainer from './Canvas/CanvasContainer';
import CodeContainer from './CodeAndConsole/CodeContainer';
import CompilerAPI from '../API/CompilerAPI';

export default function Homepage(props) {
    const [openDialog, setOpenDialog] = React.useState(false);                      // Dialog
    const [type, setType] = React.useState(1);
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [code, setCode] = React.useState('// code ');
    const [output, setOutput] = React.useState(null);               /* Code compiling result */
    const [compiling, setCompiling] = React.useState(false);


    const handleClickOpenDialog = (type, title, content) => {
        setType(type);
        setTitle(title);
        setContent(content);
        setOpenDialog(true);
    };

    const handleCompile = async () => {
        setCompiling(true);
        try {
            const token = await CompilerAPI.compile(code, '');
            const data = await CompilerAPI.checkStatus(token);
            setOutput(data);
        } catch (err) {
            console.error("API Compiling error:", err);
            setCompiling(false);
        } finally {
            setCompiling(false);
        }
    };

    return (
        <Box sx={{ position: 'relative', minHeight: '100vh' }}>
            <Grid container >

                {/* Dialog */}
                <CustomDialog openDialog={openDialog} setOpenDialog={setOpenDialog} type={type} title={title} content={content}  ></CustomDialog>

                {/* Code and console */}
                <Grid item xs={7}>
                    <CodeContainer code={code} setCode={setCode} output={output} compiling={compiling} handleCompile={handleCompile} />
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