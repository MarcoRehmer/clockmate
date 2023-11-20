'use client';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectBookingsState } from '@/app/store/selectors';
import { AppDispatch } from '@/app/store/store';
import { useEffect, useState } from 'react';
import { deleteBooking, getBookings } from '@/app/store/bookings/bookingsThunks';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';
import { DeleteBookingDialog } from './DeleteBookingDialog';
import { BookingRowMenu } from './BookingRowMenu';

export const BookingTable = () => {
  const { bookings } = useSelector(selectBookingsState);
  const [rowMenuAnchor, setRowMenuAnchor] = useState<HTMLElement | null>(null);
  const [selectedRowId, setSelectedRowId] = useState<number | undefined>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  // TODO: move to better init location
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getBookings({ sortBy: 'id' }));
  }, [dispatch]);

  const handleRowAction = (action: 'edit' | 'delete') => {
    switch (action) {
      case 'edit':
        console.log('edit');
        break;
      case 'delete':
        setDeleteDialogOpen(true);
        break;
      default:
        console.log('unknown action');
    }
  };

  const handleDeleteBooking = (confirmed: boolean) => {
    selectedRowId && confirmed && dispatch(deleteBooking(selectedRowId));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Remarks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <IconButton
                    aria-label="menu"
                    onClick={(event) => {
                      setRowMenuAnchor(event.currentTarget);
                      setSelectedRowId(row.id);
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.startedAt.toFormat('HH:mm')}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.finishedAt?.toFormat('HH:mm') || ''}
                </TableCell>

                <TableCell>{row.clientId}</TableCell>
                <TableCell>{row.projectId}</TableCell>
                <TableCell>{row.remarks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedRowId && (
        <BookingRowMenu anchorEl={rowMenuAnchor} setAnchor={setRowMenuAnchor} handleRowAction={handleRowAction} />
      )}

      {selectedRowId && (
        <DeleteBookingDialog
          openDialog={deleteDialogOpen}
          setOpenDialog={setDeleteDialogOpen}
          rowId={selectedRowId}
          handleDeleteBooking={handleDeleteBooking}
        />
      )}
    </>
  );
};
