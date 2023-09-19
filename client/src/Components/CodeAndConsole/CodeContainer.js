import CodeEditorWindow from "./CodeEditorWindow";
import * as React from 'react';
import ConsoleWindow from "./ConsoleWindow";
import { Box } from "@mui/material";

const defaultCode = `public static void main (String[] args) {
  /* code */
}`;

export default function CodeContainer(props) {
    const { runStatus, setRunStatus } = props;

    const [code, setCode] = React.useState(defaultCode);
    const [output, setOutput] = React.useState(null);

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