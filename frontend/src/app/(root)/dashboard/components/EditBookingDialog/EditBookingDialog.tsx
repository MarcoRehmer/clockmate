import { Activity } from '@/app/core/types';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { TimeField } from '@mui/x-date-pickers';
import { DateTime } from 'luxon';
import { useState } from 'react';
import styles from './edit-booking-dialog.module.scss';

export const EditBookingDialog = ({
  openDialog,
  setOpenDialog,
  booking,
  onBookingEdited,
}: {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  booking: Activity;
  onBookingEdited: (booking: Activity) => void;
}) => {
  const [remarks, setRemarks] = useState(booking.remarks);
  const [startedAt, setStartedAt] = useState<DateTime>(booking.startedAt);
  const [finishedAt, setFinishedAt] = useState<DateTime | undefined>(booking.finishedAt);

  const handleConfirm = () => {
    onBookingEdited({ ...booking, remarks, startedAt, finishedAt });
    handleClose();
  };

  const handleClose = () => setOpenDialog(false);

  return (
    <>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Edit Booking</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit Booking with id: {booking.id}</DialogContentText>
          <div className={styles.container}>
            <TimeField
              label="started at"
              clearable={true}
              value={startedAt}
              onChange={(value) => value && setStartedAt(value)}
            />
            <TimeField
              label="finished at"
              clearable={true}
              value={finishedAt}
              onChange={(value) => setFinishedAt(value || undefined)}
            />
            <TextField
              id="remarks"
              label="Remarks"
              fullWidth
              variant="standard"
              value={remarks}
              onChange={(event) => setRemarks(event.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Abort</Button>
          <Button onClick={handleConfirm} autoFocus>
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
