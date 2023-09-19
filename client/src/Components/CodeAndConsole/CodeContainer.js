import CodeEditorWindow from "./CodeEditorWindow";
import * as React from 'react';
import ConsoleWindow from "./ConsoleWindow";
import { Box } from "@mui/material";


export default function CodeContainer(props) {
    const { code, setCode, output } = props;

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
        <Box>
            <CodeEditorWindow code={code} onChange={onChange} />
        </Box>
        <Box margin={0.5}>
            <ConsoleWindow output={output} />
        </Box>
    </>);
}