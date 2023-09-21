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
