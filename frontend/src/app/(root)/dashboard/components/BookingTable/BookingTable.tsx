'use client';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/store/store';
import { useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DeleteBookingDialog } from '../DeleteBookingDialog/DeleteBookingDialog';
import { BookingRowMenu } from '../BookingRowMenu/BookingRowMenu';
import { EditBookingDialog } from '../EditBookingDialog/EditBookingDialog';
import { Booking } from '@/app/core/types';
import { getBookings } from '@/app/store/bookings/slices/getBookings';
import { deleteBooking } from '@/app/store/bookings/slices/deletBooking';
import { editBooking } from '@/app/store/bookings/slices/editBooking';
import { selectCurrentBookings } from '@/app/store/bookings/bookingSelectors';
import { DateTime } from 'luxon';

export const BookingTable = () => {
  const bookings = useSelector(selectCurrentBookings);
  const [rowMenuAnchor, setRowMenuAnchor] = useState<HTMLElement | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | undefined>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);

  // TODO: move to better init location
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(
      getBookings({
        orderBy: { prop: 'remarks', direction: 'desc' },
        // rangeFrom: DateTime.fromFormat('2023-12-03', 'yyyy-MM-dd')?.toFormat('yyyy-MM-dd') || '',
        rangeTo: DateTime.fromFormat('2023-12-04', 'yyyy-MM-dd')?.toFormat('yyyy-MM-dd') || '',
      })
    );
  }, [dispatch]);

  const handleRowAction = (action: 'edit' | 'delete') => {
    switch (action) {
      case 'edit':
        setEditDialogOpen(true);
        break;
      case 'delete':
        setDeleteDialogOpen(true);
        break;
      default:
        console.log('unknown action');
    }
  };

  const handleDeleteBooking = () => {
    selectedBooking && dispatch(deleteBooking(selectedBooking.id));
  };

  const handleEditBooking = (booking: Booking) => {
    dispatch(editBooking({ bookingId: booking.id, partialBooking: booking }));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.startedAt.toFormat('HH:mm')}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.finishedAt?.toFormat('HH:mm') || ''}
                </TableCell>
                <TableCell>{row.remarks}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="menu"
                    onClick={(event) => {
                      setRowMenuAnchor(event.currentTarget);
                      setSelectedBooking(row);
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedBooking && (
        <BookingRowMenu anchorEl={rowMenuAnchor} setAnchor={setRowMenuAnchor} handleRowAction={handleRowAction} />
      )}

      {selectedBooking && deleteDialogOpen && (
        <DeleteBookingDialog
          openDialog={deleteDialogOpen}
          setOpenDialog={setDeleteDialogOpen}
          rowId={selectedBooking.id}
          handleDeleteBooking={handleDeleteBooking}
        />
      )}

      {selectedBooking && editDialogOpen && (
        <EditBookingDialog
          openDialog={editDialogOpen}
          setOpenDialog={setEditDialogOpen}
          booking={selectedBooking}
          onBookingEdited={handleEditBooking}
        />
      )}
    </>
  );
};
