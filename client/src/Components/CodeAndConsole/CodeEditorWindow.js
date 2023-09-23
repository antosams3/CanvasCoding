import * as React from 'react';
import AceEditor from "react-ace";
import { Range } from 'ace-builds';
import { diffLines } from 'diff';
import { CircularProgress, Box } from '@mui/material';
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/ext-language_tools";

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

    const [changedLines, setChangedLines] = React.useState([]);             // Lines to highligh after diff
    //const [highlightLine, setHighlightLine] = React.useState([]);
    const [value, setValue] = React.useState(code);                         // Actual editor value 

    /* Evaluate diffs */
    React.useEffect(() => {
        const changes = diffLines(value, code);             //value -> old, code -> new
        const newChangedLines = [];
        let lineCounter = 0;

        changes.forEach((change) => {
            if (change.added) {
                const start = lineCounter;
                let end = lineCounter + change.count - 1;
                if (end === start) {
                    end++;
                }
                newChangedLines.push({ start, end });
                lineCounter = end + 1;
            } else if (!change.removed) {
                lineCounter += change.count;
            }
        });
        setChangedLines(newChangedLines);
        setValue(code);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code])

    React.useEffect(() => {
        if (!loading) {
            if (!AceEditor) return;
            const editor = ace.edit('editor'); // editor = id
            removeMarkers(); // Remove existing markers

            changedLines.forEach((change) => {
                const newRange = new Range(change.start, 0, change.end, 0);
                editor.getSession().addMarker(newRange, 'ace_selection', 'fullLine', false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [changedLines])

    React.useEffect(() => {
        if(Object.keys(selectObj).length > 1){
            console.log(selectObj);
        }
    }, [selectObj])

    const removeMarkers = () => {
        const editor = ace.edit('editor'); // editor = id
        const activeMarkers = editor.getSession().getMarkers(false);
        for (const key in activeMarkers) {
            if (activeMarkers[key].clazz === 'ace_selection') {
                editor.getSession().removeMarker(key);
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