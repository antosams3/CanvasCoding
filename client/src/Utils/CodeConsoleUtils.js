import { Typography } from '@mui/material';
import { Fragment } from 'react';

export function parseConsoleOutput(output) {
    let statusId = output?.status?.id;

    switch (statusId) {
        case 3: // Accepted
            return (
                <Typography
                    variant="body2"
                    sx={{
                        padding: '2px 4px',
                        fontSize: '0.75rem',
                        fontWeight: 'normal',
                        color: 'green',
                    }}>
                    {(output.stdout) !== null
                        ? `${atob(output.stdout)}`
                        : "Code compiled successfully!"}
                </Typography>);

        case 5: // Time limit exceeded
            return (
                <Typography
                    variant="body2"
                    sx={{
                        padding: '2px 4px',
                        fontSize: '0.75rem',
                        fontWeight: 'normal',
                        color: 'yellow',
                    }}>
                    {`Time Limit Exceeded`}
                </Typography>);

        case 6: // Compilation error
            const compileOutput = atob(output?.compile_output);
            const lines = compileOutput.split('\n');                                        // Split result in lines
            console.log(lines);
            return (
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: '0.875rem',
                        padding: '2px 4px',
                        fontWeight: 'normal',
                        color: 'red',
                        whiteSpace: 'pre-wrap'
                    }}>
                    {lines.map((line, index) => (
                        <Fragment key={index}>
                            {line}
                            {index !== lines.length - 1 && <br />} {/* Aggiungi <br> a tutte le righe tranne l'ultima */}
                        </Fragment>
                    ))}
                </Typography>);

        default: // Generic error
            return (
                <Typography
                    variant="body2"
                    sx={{
                        paddingX: 2,
                        paddingY: 1,
                        fontWeight: 'normal',
                        fontSize: '0.75rem', // corrisponde a text-xs
                        color: 'red',
                    }}>
                    {atob(output?.stderr)}
                </Typography>
            );
    }

};

/* Returns array containing lines to highligh (start, end) */
export function getChangedLines(changes) {
    let lineCounter = 0;
    const newChangedLines = [];

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

    return newChangedLines;
}

export function findObject(object, code) {
    const lines = code.split('\n');
    const highlightedLines = [];

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(object)) {
            highlightedLines.push(i);
        }
    }

    return highlightedLines;
}

export function evaluateAnnotations(output){
    const statusId = output?.status?.id;
    let annotation = []

    if(statusId === 6){ // Compile error
        const compileOutput = atob(output?.compile_output);
        const lines = compileOutput.split('\n');                                        // Split result in lines
        lines.forEach(line => {
            const match = line.match(/Main\.java:(\d+): ([a-zA-Z]+): (.+)/);            // RegEx -> captures row number, error type and text
            if (match && match.length === 4) {
                annotation.push({
                    row: (match[1] - 1),
                    column: 0,
                    text: match[3],
                    type: match[2]                                                      
                })
              }
        })
    }
    return annotation;
}