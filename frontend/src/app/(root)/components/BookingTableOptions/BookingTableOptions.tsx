'use client';
import { RangeSelector } from '../RangeSelector';
import { IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';
import styles from './booking-table-options.module.scss';
import { CreateBookingDialog } from '@/app/(root)/components/CreateBookingDialog/CreateBookingDialog';
import { Booking } from '@/app/core/types';

export const BookingTableOptions = () => {
  const [createBookingOpen, setCreateBookingOpen] = useState(false);

  const handleAddNewBooking = () => setCreateBookingOpen(true);
  const handleNewBookingClose = (booking: Omit<Booking, 'id'> | undefined) => {
    console.log('new booking', booking);
    setCreateBookingOpen(false);
  };

  return (
    <>
      <div className={styles['booking-table-options-container']}>
        <div>
          <RangeSelector />
        </div>

        <div>
          <IconButton aria-label="open filter" size="large" color="inherit">
            <FilterListIcon />
          </IconButton>

          <IconButton
            aria-label="add new booking"
            size="large"
            color="inherit"
            onClick={handleAddNewBooking}
          >
            <AddIcon />
          </IconButton>
        </div>
      </div>

      <CreateBookingDialog
        open={createBookingOpen}
        handleClose={handleNewBookingClose}
      />
    </>
  );
};
