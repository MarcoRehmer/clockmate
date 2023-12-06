import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export const DeleteBookingDialog = ({
  openDialog,
  setOpenDialog,
  rowId,
  handleDeleteBooking,
}: {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  rowId: number;
  handleDeleteBooking: () => void;
}) => {
  const handleConfirm = () => {
    handleDeleteBooking();
    handleClose();
  };

  const handleClose = () => setOpenDialog(false);

  return (
    <>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Delete Booking</DialogTitle>
        <DialogContent>
          <DialogContentText>Do you really want delete booking with id {rowId}?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Abort</Button>
          <Button onClick={handleConfirm} autoFocus>
            Yes, delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
