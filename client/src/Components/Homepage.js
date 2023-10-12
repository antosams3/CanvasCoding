import * as React from 'react';
import { Grid } from "@mui/material";
import Footer from "./Footer";
import Box from "@mui/material/Box";
import CustomDialog from '../Utils/CustomDialog';
import CanvasContainer from './Canvas/CanvasContainer';
import CodeContainer from './CodeAndConsole/CodeContainer';
import CompilerAPI from '../API/CompilerAPI';
import { CanvasInterpreter, CodeInterpreter } from '../Utils/Interpreter';
import { evaluateAnnotations } from '../Utils/CodeConsoleUtils';

export default function Homepage(props) {
    const { code, setCode, level, dialog, handleClickDialog, setAnswer, showLevelMission, showLevelSteps, actionMenu, showStepTips, handleProgressionChecker, disabled } = props;
    const [objects, setObjects] = React.useState([]);                               // Canvas objects 
    const [selectObj, setSelectObj] = React.useState(null);                         // Selected object in canvas Ex. {id: ... type: ..} or null
    const [output, setOutput] = React.useState(null);                               // Code console
    const [compiling, setCompiling] = React.useState(false);                        // Compiling state 
    const [loading, setLoading] = React.useState(true);                             // Initial loading state 
    const [annotations, setAnnotations] = React.useState([]);                       // Warnings and errors generated after compile 
    const [counter, setCounter] = React.useState(0);                                // Sync and compile press counter 

    setTimeout(finish, 1000)

    function finish() {
        setLoading(false);              // Code Editor loading = false
    }

    React.useEffect(() => {
        // Imposta l'overflow del corpo del documento su 'hidden' quando il componente è montato
        document.body.style.overflow = 'hidden';

        // Pulisci l'effetto quando il componente è smontato
        return () => {
            document.body.style.overflow = 'visible';
        };
    }, []);

    // Code sync with canvas
    React.useEffect(() => {
        if (!compiling) {
            setCode(CanvasInterpreter(objects));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [objects])

    // Canvas compiling
    React.useEffect(() => {
        if (compiling) {
            setObjects(CodeInterpreter(code));
        }
    }, [compiling, code]);

    // Canvas compiling
    React.useEffect(() => {

        handleProgressionChecker(null, null, null, counter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [counter]);

    const handleCompile = async () => {
        try {
            setCompiling(true);
            const token = await CompilerAPI.compile(code, '');
            const data = await CompilerAPI.checkStatus(token);
            setAnnotations(evaluateAnnotations(data));                                      // Extract error, warnings and info from compiler result    
            setOutput(data);
            setCounter(counter + 1);
        } catch (err) {
            console.error("API Compiling error:", err);
            setOutput(err);
            setCompiling(false);
        } finally {
            setCompiling(false);
        }
    };

    const handleSync = () => {
        setCounter(counter + 1);
        setObjects(CodeInterpreter(code));
    }

    return (
        <Box sx={{ position: 'relative', minHeight: '100vh' }}>
            <Grid container >

                {/* Dialog */}
                <CustomDialog dialog={dialog} setAnswer={setAnswer} setCode={setCode}></CustomDialog>

                {/* Code and console */}
                <Grid item xs={7}>
                    <CodeContainer code={code} setCode={setCode} output={output} compiling={compiling} handleCompile={handleCompile} loading={loading} selectObj={selectObj} annotations={annotations} handleSync={handleSync} />
                </Grid>

                {/* Canvas, side and action menu */}
                <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column', position: 'relative', height: '100%' }}>
                    <CanvasContainer setCode={setCode} objects={objects} setObjects={setObjects} selectObj={selectObj} setSelectObj={setSelectObj} actionMenu={actionMenu} handleProgressionChecker={handleProgressionChecker} ></CanvasContainer>
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
                        <Footer handleClickDialog={handleClickDialog} showLevelMission={showLevelMission} level={level} showLevelSteps={showLevelSteps} showStepTips={showStepTips} disabled={disabled} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}