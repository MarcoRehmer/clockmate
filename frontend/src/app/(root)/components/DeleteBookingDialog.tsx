import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';

export const DeleteBookingDialog = ({
  openDialog,
  setOpenDialog,
  rowId,
  handleDeleteBooking,
}: {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  rowId: number;
  handleDeleteBooking: (confirmed: boolean) => void;
}) => {
  const handleConfirm = () => {
    handleDeleteBooking(true);
    handleClose();
  };

  const handleAbort = () => {
    handleDeleteBooking(false);
    handleClose();
  };

  const handleClose = () => setOpenDialog(false);

  return (
    <>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>Do you really want delete booking with id {rowId}?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAbort}>Abort</Button>
          <Button onClick={handleConfirm} autoFocus>
            Yes, delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
