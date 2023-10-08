import { Booking } from '@/app/core/types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useState } from 'react';

interface CreateBookingDialogProps {
  open: boolean;
  handleClose: (booking: Booking | undefined) => void;
}

export const CreateBookingDialog = ({
  open,
  handleClose,
}: CreateBookingDialogProps) => {
  const [remarks, setRemarks] = useState('');

  return (
    <Dialog open={open} onClose={() => handleClose(undefined)}>
      <DialogTitle>Create new Booking</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="remarks"
          label="Remarks"
          fullWidth
          variant="standard"
          value={remarks}
          onChange={(event) => setRemarks(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(undefined)}>
          Cancel
        </Button>
        <Button onClick={() => handleClose({ id: 42, duration: '0', remarks })}>Create Booking</Button>
      </DialogActions>
    </Dialog>
  );
};