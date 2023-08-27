import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

interface BookingRow {
  id: number;
  duration: string;
  client?: string; // TODO: have to be number / gid
  project?: string; // TODO: have to be number / gid
  issue?: string;
  remarks?: string;
}

export const BookingTable = () => {
  const rows: ReadonlyArray<BookingRow> = [
    {
      id: 1,
      duration: '1:45', // recalculate to minutes
      client: 'Kunde 1',
      project: 'Projekt 1',
      issue: '1234',
    },
    {
      id: 2,
      duration: '0:30', // recalculate to minutes
      client: 'Kunde 1',
      project: 'Projekt 1',
      issue: '5500',
      remarks: 'Support',
    },
    {
      id: 3,
      duration: '2:30', // recalculate to minutes
      client: 'Kunde 2',
      issue: '2304',
      remarks: 'Refactoring',
    },
  ];

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
          {rows.map((row) => (
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
