'use client';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DeleteBookingDialog } from '../DeleteBookingDialog/DeleteBookingDialog';
import { BookingRowMenu } from '../BookingRowMenu/BookingRowMenu';
import { EditBookingDialog } from '../EditBookingDialog/EditBookingDialog';
import { Activity } from '@/app/core/types';
import React from 'react';

import Typography from '@mui/material/Typography';
import { ApiContext } from '@/app/provider/appProvider';
import { mapBookingDtoToBooking } from '@/app/api/mapper/map-booking-dto-to-booking';

export const BookingTable = () => {
  // const activities = useSelector(selectCurrentBookings);
  const [activities, setActivities] = useState<Array<Activity>>([]);
  const [rowMenuAnchor, setRowMenuAnchor] = useState<HTMLElement | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Activity | undefined>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const api = useContext(ApiContext);

  // const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchData = async () => {
      return (await api.activities.getActivities()).map((activity) => mapBookingDtoToBooking(activity));
    };

    fetchData()
      .then((res) => setActivities(res))
      .catch((err) => console.error('error while fetching data', err));
  }, [api.activities]);

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
    // selectedBooking && dispatch(deleteBooking(selectedBooking.id));
    console.log('delete booking');
  };

  const handleEditBooking = (booking: Activity) => {
    // dispatch(editBooking({ bookingId: booking.id, partialBooking: booking }));
    console.log('edit booking');
  };

  return (
    <>
      <TableContainer>
        <Table style={{ tableLayout: 'auto' }}>
          <TableHead>
            <TableRow>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((row, index) => (
              <React.Fragment key={row.id}>
                {index === 0 || (index > 0 && row.startedAt.day !== activities[index - 1].startedAt.day) ? (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Typography sx={{ color: 'text.primary' }}>
                        {row.startedAt.toFormat('EEEE, dd.MM.yyyy')}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )}
                <TableRow>
                  <TableCell
                    sx={{
                      color: 'text.secondary',
                      width: 80,
                    }}
                  >
                    {row.startedAt.toFormat('HH:mm')}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: 'text.secondary',
                      width: 80,
                    }}
                  >
                    {row.finishedAt?.toFormat('HH:mm') || ''}
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{row.remarks}</TableCell>
                  <TableCell sx={{ padding: 0, width: '1rem' }}>
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
              </React.Fragment>
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
