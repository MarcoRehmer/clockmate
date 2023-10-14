'use client';
import {
  IconButton,
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
import { useEffect, useState } from 'react';
import { getBookings } from '@/app/store/bookings/bookingsThunks';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { RowMenu } from './RowMenu';

export const BookingTable = () => {
  const { bookings, loading } = useSelector(selectBookingsState);
  const [rowMenuAnchor, setRowMenuAnchor] = useState<HTMLElement | null>(null);

  // TODO: move to better init location
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getBookings({ sortBy: 'id' }));
  }, [dispatch]);

  return (
    <>
      <p>Loading: {loading.toString()}</p>
      <RowMenu anchor={rowMenuAnchor} />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Remarks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <IconButton
                    aria-label="menu"
                    onClick={(event) => setRowMenuAnchor(event.currentTarget)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                  {/*{row.duration}*/}
                </TableCell>
                <TableCell>{row.clientId}</TableCell>
                <TableCell>{row.projectId}</TableCell>
                <TableCell>{row.remarks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
