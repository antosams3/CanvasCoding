import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import FileInput from './FileInput';
import { Typography } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomDialog(props) {
    const { dialog, setAnswer, setCode } = props;
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (Object.keys(dialog).length) {
            setOpen(true);
        }
    }, [dialog])

    const handleClose = () => {
        setOpen(false);
    };

    const handleProceed = () => {
        setAnswer(true);
        setOpen(false);
    }
    const handleDecline = () => {
        setAnswer(false);
        setOpen(false);
    }

    return (<>
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description">

            <DialogTitle>{dialog?.title}</DialogTitle>

            {dialog?.type === 3 ?
                <DialogContent>
                    <FileInput setCode={setCode} setOpen={setOpen} ></FileInput>
                </DialogContent>
                :
                <DialogContent>
                    <Typography dangerouslySetInnerHTML={{ __html: dialog?.content?.replace(/\n/g, '<br />') }} />
                </DialogContent>
            }

            {/* Dialog with question */}
            {dialog?.type === 1 ?
                <DialogActions>
                    <Button onClick={handleDecline}>Abort</Button>
                    <Button onClick={handleProceed}>Ok</Button>
                </DialogActions> :
                /* Dialog with close */
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>}

        </Dialog>
    </>);
}