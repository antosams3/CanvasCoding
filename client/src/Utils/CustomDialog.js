import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomDialog(props) {
    const { setOpenDialog, openDialog, type, title, content } = props;      /* type in 1 (question), 2 (info) */


    const handleClose = () => {
        setOpenDialog(false);
    };

    return (<>
        <Dialog
            open={openDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description">

            <DialogTitle>{title}</DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            {type === 1 ? <DialogActions>
                <Button onClick={handleClose}>Abort</Button>
                <Button onClick={handleClose}>Ok</Button>
            </DialogActions> :
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>}

        </Dialog>
    </>);
}