import { Typography } from '@mui/material';

export function getConsoleOutput(output) {
    let statusId = output?.status?.id;
    if (statusId === 6) {  // Compilation error
        return (
            <Typography
                variant="body2"
                sx={{
                    fontSize: '0.875rem',
                    padding: '2px 4px',
                    fontWeight: 'normal',
                    color: 'red',
                }}>
                {atob(output?.compile_output)}
            </Typography>
        );
    } else if (statusId === 3) {    // Accepted
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
            </Typography>

        );
    } else if (statusId === 5) { // Time Limit Exceeded
        return (
            <Typography
                variant="body2"
                sx={{
                    padding: '2px 4px',
                    fontSize: '0.75rem',
                    fontWeight: 'normal',
                    color: 'red',
                }}>
                {`Time Limit Exceeded`}
            </Typography>

        );
    } else {
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
export function getChangedLines(changes){
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

export function findObject(object, code){
    const lines = code.split('\n');
    const highlightedLines = [];

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(object)) {
        highlightedLines.push(i);
      }
    }
  
    return highlightedLines;
}