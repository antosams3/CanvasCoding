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
    const { dialog } = props;                                
    const [open, setOpen] = React.useState(false);

    React.useEffect(()=>{
        if(Object.keys(dialog).length){
            setOpen(true);
        }
    },[dialog])

    const handleClose = () => {
        setOpen(false);
    };

    return (<>
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description">

            <DialogTitle>{dialog?.title}</DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {dialog?.content}
                </DialogContentText>
            </DialogContent>
            {dialog?.type === 1 ? <DialogActions>
                <Button onClick={handleClose}>Abort</Button>
                <Button onClick={handleClose}>Ok</Button>
            </DialogActions> :
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>}

        </Dialog>
    </>);
}