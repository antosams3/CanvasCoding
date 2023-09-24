import * as React from 'react';
import AceEditor from "react-ace";
import { Range } from 'ace-builds';
import { diffLines } from 'diff';
import { CircularProgress, Box } from '@mui/material';
import { getChangedLines, findObject } from '../../Utils/CodeConsoleUtils';
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/ext-language_tools";
import { objectToInstance } from '../../Utils/Interpreter';

const ace = require("ace-builds/src-noconflict/ace");
ace.config.set(
    "basePath",
    "https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/"
);
ace.config.setModuleUrl(
    "ace/mode/javascript_worker",
    "https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/worker-javascript.js"
);


export default function CodeEditorWindow(props) {
    const { code, onChange, loading, selectObj } = props;

    const [changedLines, setChangedLines] = React.useState([]);             // Lines to highlight after diff
    const [highlightLines, setHighlightLines] = React.useState([]);         // Lines to highlight after selecting object in canvas 
    const [value, setValue] = React.useState(code);                         // Actual editor value 
    const editorRef = React.useRef(null);

    React.useEffect(() => {
        if (AceEditor) {
            editorRef.current = ace.edit('editor');
        }
    }, []);

    /* Evaluate diffs when code changes */
    React.useEffect(() => {
        const changes = diffLines(value, code);                             //value -> old, code -> new
        setChangedLines(getChangedLines(changes));                          // Returns array containing lines to highligh (start, end)

        setValue(code);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code]);

    React.useEffect(() => {
        if (!loading) {                                                     // First render skips linesHighlight
            const session = editorRef.current.getSession();
            removeMarkers();                                                // Remove existing markers

            changedLines.forEach((change) => {
                const newRange = new Range(change.start, 0, change.end, 0);
                session.addMarker(newRange, 'ace_selection', 'text', false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [changedLines]);

    /* Find code when selectObj changes */
    React.useEffect(() => {
        removeMarkers();
        if (Object.keys(selectObj).length > 1) {                            // Checks if selectedObj is not just type (side menu)
            const objectInstance = objectToInstance(selectObj);             // Casts the selectedObject into the String representing it
            setHighlightLines(findObject(objectInstance, code));            // Returns an array containing the rows to highligh, or an empty array instead
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectObj]);

    React.useEffect(() => {
        if (!loading) {
            const session = editorRef.current.getSession();

            highlightLines.forEach((line) => {
                const newRange = new Range(line, 0, line + 1, 0);
                session.addMarker(newRange, 'ace_selection', 'text', false);
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [highlightLines]);

    const removeMarkers = () => {
        if (editorRef.current) {
            const session = editorRef.current.getSession();
            const markers = session.getMarkers();
            for (const key in markers) {
                if (markers[key].clazz === 'ace_selection') {
                    session.removeMarker(key);
                }
            }
        }
    }

    const handleEditorChange = (value) => {
        setValue(value);
        onChange("code", value);
    };

    return (
        AceEditor && (<>
            <Box sx={{ filter: loading ? 'blur(5px)' : '' }}><AceEditor
                placeholder=""
                mode="java"
                theme="textmate"
                name="editor"
                width='100%'
                onChange={handleEditorChange}
                fontSize={14}
                showPrintMargin={false}
                showGutter={true}
                highlightActiveLine={true}
                onFocus={() => { removeMarkers(); }}
                value={value}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 2,
                }} />
            </Box>
            {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                <CircularProgress />
            </Box> : ''}
        </>)
    );


}