'use client';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectBookingsState } from '@/app/store/selectors';
import { AppDispatch } from '@/app/store/store';
import { useEffect } from 'react';
import { getBookings } from '@/app/store/bookings/bookingsThunks';

export const BookingTable = () => {
  const { bookings, loading } = useSelector(selectBookingsState);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getBookings({ sortBy: 'id' }));
  }, [dispatch]);

  return (
    <>
      <p>Loading: {loading.toString()}</p>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Duration</TableCell>
              <TableCell align="right">Client</TableCell>
              <TableCell align="right">Project</TableCell>
              <TableCell align="right">Remarks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.duration}
                </TableCell>
                <TableCell align="right">{row.client}</TableCell>
                <TableCell align="right">{row.project}</TableCell>
                <TableCell align="right">{row.remarks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
