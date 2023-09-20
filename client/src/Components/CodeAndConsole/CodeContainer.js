import CodeEditorWindow from "./CodeEditorWindow";
import * as React from 'react';
import ConsoleWindow from "./ConsoleWindow";
import { Box } from "@mui/material";
import CompileButton from "./CompileButton";

export default function CodeContainer(props) {
    const { code, setCode, output, compiling, handleCompile, loading  } = props;

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
            <CodeEditorWindow code={code} onChange={onChange} loading={loading} />
            <div style={{ position: 'absolute', bottom: '2em', right: '2em' }}>
                <CompileButton compiling={compiling} handleCompile={handleCompile} ></CompileButton>
            </div>
        </Box>
        <Box margin={0.5}>
            <ConsoleWindow output={output} compiling={compiling} />
        </Box>
    </>);
}