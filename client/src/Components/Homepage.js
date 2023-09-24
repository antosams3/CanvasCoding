import * as React from 'react';
import { Grid } from "@mui/material";
import Footer from "./Footer";
import Box from "@mui/material/Box";
import CustomDialog from '../Utils/CustomDialog';
import CanvasContainer from './Canvas/CanvasContainer';
import CodeContainer from './CodeAndConsole/CodeContainer';
import CompilerAPI from '../API/CompilerAPI';
import { CanvasInterpreter, CodeInterpreter } from '../Utils/Interpreter';

export default function Homepage() {
    const [openDialog, setOpenDialog] = React.useState(false);                      // Dialog
    const [type, setType] = React.useState(1);                                      // Dialog type
    const [title, setTitle] = React.useState("");                                   // Dialog title 
    const [content, setContent] = React.useState("");                               // Dialog content 

    const [code, setCode] = React.useState("");                                     // Code                                          
    const [objects, setObjects] = React.useState([]);                               // Canvas objects 
    const [selectObj, setSelectObj] = React.useState([]);                           // Selected object in canvas {id: ... type: ..} or just type for new objects
    const [output, setOutput] = React.useState(null);                               // Code console
    const [compiling, setCompiling] = React.useState(false);                        // Compiling state 
    const [loading, setLoading] = React.useState(true);                             // Initial loading state 

    const handleClickOpenDialog = (type, title, content) => {
        setType(type);
        setTitle(title);
        setContent(content);
        setOpenDialog(true);
    };

    React.useEffect(() => {
        if(!compiling){
            setCode(CanvasInterpreter(objects));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [objects])

    React.useEffect(() => {
        if(compiling){
            setObjects(CodeInterpreter(code));
        }
    }, [compiling, code]);

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
                    <CodeContainer code={code} setCode={setCode} output={output} compiling={compiling} handleCompile={handleCompile} loading={loading} selectObj={selectObj}  />
                </Grid>

                {/* Canvas, side and action menu */}
                <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column', position: 'relative', height: '100%' }}>
                    <CanvasContainer setCode={setCode} setLoading={setLoading} objects={objects} setObjects={setObjects} selectObj={selectObj} setSelectObj={setSelectObj} ></CanvasContainer>
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