'use client';
import { RangeSelector } from '../RangeSelector/RangeSelector';
import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';
import { Activity } from '@/app/core/types';
import { CreateActivityDialog } from '../CreateBookingDialog/CreateActivityDialog';
import { DateTime } from 'luxon';
import { TableFilter } from '../../Dashboard';

export const BookingTableOptions = (props: {
  onActivityAdded: (activity: Omit<Activity, 'id'>) => void;
  onFilterChanged: (filter: TableFilter) => void;
}) => {
  const [createBookingOpen, setCreateBookingOpen] = useState(false);

  const handleAddNewBooking = () => setCreateBookingOpen(true);
  const handleNewBookingClose = (activity: Omit<Activity, 'id'> | undefined) => {
    if (activity) {
      props.onActivityAdded(activity);
    }

    setCreateBookingOpen(false);
  };

  const changeRange = (selectedRange: { from: DateTime; to: DateTime }) => {
    props.onFilterChanged({
      rangeFrom: selectedRange.from.toFormat('yyyy-MM-dd') || '',
      rangeTo: selectedRange.to.toFormat('yyyy-MM-dd') || '',
    });
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <RangeSelector selectedRangeChanged={changeRange} />
        </div>

        <div>
          <IconButton aria-label="add new booking" size="large" onClick={handleAddNewBooking}>
            <AddIcon />
          </IconButton>
        </div>
      </Box>
      {createBookingOpen && <CreateActivityDialog open={createBookingOpen} handleClose={handleNewBookingClose} />}
    </>
  );
};
