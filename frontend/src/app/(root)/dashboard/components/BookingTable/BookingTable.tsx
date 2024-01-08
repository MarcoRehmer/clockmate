'use client';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DeleteBookingDialog } from '../DeleteBookingDialog/DeleteBookingDialog';
import { BookingRowMenu } from '../BookingRowMenu/BookingRowMenu';
import { EditBookingDialog } from '../EditBookingDialog/EditBookingDialog';
import { Activity } from '@/app/core/types';
import React from 'react';

import Typography from '@mui/material/Typography';

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
            {props.activities.map((row, index) => (
              <React.Fragment key={row.id}>
                {index === 0 || (index > 0 && row.startedAt.day !== props.activities[index - 1].startedAt.day) ? (
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
