import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface FormDialogCustomProps {
  buttonText?: string;
  dialogTitle: string;
  label: string;
  next: Function;
  leftButtonText?: string;
  rightButtonText?: string;
  maxWidth?: 'xs' | 'md';
  color?: 'primary' | 'secondary' | 'error' | 'inherit' | 'success' | 'info' | 'warning' | undefined;
  variant?: 'text' | 'outlined' | 'contained' | undefined;
}

export default function FormDialog(props: FormDialogCustomProps) {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDone = () => {
    props.next(text);
    setText('');
    setOpen(false);
  };

  return (
    <div>
      <Button color={props.color || 'primary'} variant={props.variant || 'outlined'} onClick={handleClickOpen}>
        {props.buttonText && props.buttonText}
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={props.maxWidth || 'xs'}>
        <DialogTitle>{props.dialogTitle}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="textfield"
            label={props.label || ''}
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{props.leftButtonText || `Cancel`}</Button>
          <Button onClick={handleDone}>{props.leftButtonText || `Done`}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
