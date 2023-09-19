import * as React from 'react';
import AceEditor from "react-ace";

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
    const { code, onChange } = props;
    const defaultCode = `public static void main (String[] args) {
${code}
}`;
    const [value, setValue] = React.useState(defaultCode || "");

    React.useEffect(()=>{
        setValue(code);
    },[code])

    const handleEditorChange = (value) => {
        setValue(value);
        onChange("code", value);
      };

    return (
        AceEditor && (<AceEditor
            placeholder=""
            mode="java"
            theme="textmate"
            name="blah2"
            width='100%'
            onChange={handleEditorChange}
            fontSize={14}
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            value={value}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
            }} />)
        );


}