import CodeEditorWindow from "./CodeEditorWindow";
import * as React from 'react';
import ConsoleWindow from "./ConsoleWindow";
import { Box } from "@mui/material";
import RunActions from "../Run&Debug/RunActions";


export default function CodeContainer(props) {
    const { code, setCode, output, compiling, handleCompile  } = props;

    const onChange = (action, data) => {
        switch (action) {
            case "code": {
                setCode(data);
                break;
            }
            default: {
                console.warn("case not handled!", action, data);
            }
        }
    };

    return (<>
        <Box style={{ position: 'relative' }}>
            <CodeEditorWindow code={code} onChange={onChange} />
            <div style={{ position: 'absolute', bottom: '2em', right: '2em' }}>
                <RunActions compiling={compiling} handleCompile={handleCompile} ></RunActions>
            </div>
        </Box>
        <Box margin={0.5}>
            <ConsoleWindow output={output} compiling={compiling} />
        </Box>
    </>);
}