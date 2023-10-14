import { Booking } from '@/app/core/types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { DatePicker, TimeField } from '@mui/x-date-pickers';
import { useState } from 'react';
import styles from './create-booking-dialog.module.scss';
import { DateTime } from 'luxon';

interface CreateBookingDialogProps {
  open: boolean;
  handleClose: (booking: Omit<Booking, 'id'> | undefined) => void;
}

export const CreateBookingDialog = ({
  open,
  handleClose,
}: CreateBookingDialogProps) => {
  const [remarks, setRemarks] = useState('');
  const [startedAt, setStartedAt] = useState<DateTime>(DateTime.now());
  const [finishedAt, setFinishedAt] = useState<DateTime | undefined>(undefined);

  return (
    <Dialog open={open} onClose={() => handleClose(undefined)}>
      <DialogTitle>Create new Booking</DialogTitle>
      <DialogContent>
        <div className={styles.container}>
          <DatePicker label="booking date" defaultValue={DateTime.now()} />
          <TimeField
            label="started at"
            clearable={true}
            value={startedAt}
            onChange={(value) => setStartedAt(value || DateTime.now())}
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
        <Button onClick={() => handleClose(undefined)}>Cancel</Button>
        <Button
          onClick={() =>
            handleClose({
              startedAt,
              finishedAt,
              remarks,
            })
          }
        >
          Create Booking
        </Button>
      </DialogActions>
    </Dialog>
  );
};