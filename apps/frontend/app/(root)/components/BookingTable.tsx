import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectBookings } from '../../store/slices/bookingsSlice';

export const BookingTable = () => {
  const bookings = useSelector(selectBookings);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Duration</TableCell>
            <TableCell align="right">Client</TableCell>
            <TableCell align="right">Project</TableCell>
            <TableCell align="right">Ticket</TableCell>
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
              <TableCell align="right">{row.issue}</TableCell>
              <TableCell align="right">{row.remarks}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
