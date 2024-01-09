'use client';
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DeleteBookingDialog } from '../DeleteBookingDialog/DeleteBookingDialog';
import { BookingRowMenu } from '../BookingRowMenu/BookingRowMenu';
import { EditBookingDialog } from '../EditBookingDialog/EditBookingDialog';
import { Activity } from '@/app/core/types';
import React from 'react';

import Typography from '@mui/material/Typography';
import { DateTime } from 'luxon';

interface BookingTableProps {
  activities: Array<Activity>;
  filter: { rangeFrom: string; rangeTo: string };
  onDeleteActivity: (id: number) => void;
  onEditActivity: (id: number, activity: Activity) => void;
}

export const BookingTable = (props: BookingTableProps) => {
  const [rowMenuAnchor, setRowMenuAnchor] = useState<HTMLElement | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);

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

  const calcDuration = (startedAt: DateTime, finishedAt: DateTime) => {
    const diff = finishedAt.diff(startedAt);
    return `${Math.floor(diff.as('hours'))}:${`${Math.floor(diff.as('minutes') % 60)}`.padStart(2, '0')}`;
  };

  const calcDayDuration = (activities: Array<Activity>) => {
    const sumMinutes = activities.reduce((prev, curr) => {
      const diff = (curr.finishedAt || DateTime.now()).diff(curr.startedAt);
      prev += diff.as('minutes');
      return prev;
    }, 0);

    return `${Math.floor(sumMinutes / 60)}:${`${Math.floor(sumMinutes % 60)}`.padStart(2, '0')}`;
  };

  return (
    <>
      <TableContainer>
        <Table style={{ tableLayout: 'auto' }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Duration</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.activities.map((row, index) => (
              <React.Fragment key={row.id}>
                {index === 0 || (index > 0 && row.startedAt.day !== props.activities[index - 1].startedAt.day) ? (
                  <TableRow>
                    <TableCell colSpan={4} sx={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                      <Box sx={{ display: 'flex', columnGap: 1 }}>
                        <Typography sx={{ color: 'text.primary' }}>
                          {row.startedAt.toFormat('EEEE, dd.MM.yyyy')}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>-</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                          {calcDayDuration(
                            props.activities.filter((activity) => activity.startedAt.day === row.startedAt.day)
                          )}
                          {' h'}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )}
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  {/* Duration cell */}
                  <TableCell
                    sx={{
                      width: 110,
                      color: row.finishedAt === undefined ? 'primary.main' : 'text.secondary',
                    }}
                  >
                    <div>
                      <Typography fontSize="large" sx={{ textAlign: 'center' }}>
                        {calcDuration(row.startedAt, row.finishedAt || DateTime.now())}
                      </Typography>
                      <Box sx={{ display: 'flex', columnGap: 0.5, flexDirection: 'row' }}>
                        <span>{row.startedAt.toFormat('HH:mm')}</span>-
                        <span>{row.finishedAt?.toFormat('HH:mm') || ''}</span>
                      </Box>
                    </div>
                  </TableCell>

                  {/* Remarks Cell */}
                  <TableCell>
                    <Typography fontSize="medium" sx={{ color: 'text.secondary' }}>
                      {' '}
                      {row.remarks}
                    </Typography>
                  </TableCell>

                  {/* Conetxt Menu Cell */}
                  <TableCell sx={{ padding: 0, width: '1rem' }}>
                    <IconButton
                      aria-label="menu"
                      onClick={(event) => {
                        setRowMenuAnchor(event.currentTarget);
                        setSelectedActivity(row);
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

      {selectedActivity && (
        <BookingRowMenu anchorEl={rowMenuAnchor} setAnchor={setRowMenuAnchor} handleRowAction={handleRowAction} />
      )}

      {selectedActivity && deleteDialogOpen && (
        <DeleteBookingDialog
          openDialog={deleteDialogOpen}
          setOpenDialog={setDeleteDialogOpen}
          rowId={selectedActivity.id}
          handleDeleteBooking={() => props.onDeleteActivity(selectedActivity.id)}
        />
      )}

      {selectedActivity && editDialogOpen && (
        <EditBookingDialog
          openDialog={editDialogOpen}
          setOpenDialog={setEditDialogOpen}
          booking={selectedActivity}
          onBookingEdited={(activity) => props.onEditActivity(selectedActivity.id, activity)}
        />
      )}
    </>
  );
};
