'use client';
import { RangeSelector } from '../RangeSelector/RangeSelector';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';
import { Booking } from '@/app/core/types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store/store';
import { addBooking } from '@/app/store/bookings/slices/addBooking';
import { CreateBookingDialog } from '../CreateBookingDialog/CreateBookingDialog';
import { DateTime } from 'luxon';
import { changeSelectedRange } from '@/app/store/bookings/bookingState';
import { getBookings } from '@/app/store/bookings/slices/getBookings';

export const BookingTableOptions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [createBookingOpen, setCreateBookingOpen] = useState(false);

  const handleAddNewBooking = () => setCreateBookingOpen(true);
  const handleNewBookingClose = (booking: Omit<Booking, 'id'> | undefined) => {
    if (booking) {
      dispatch(addBooking(booking));
    }

    setCreateBookingOpen(false);
  };

  const changeRange = (selectedRange: { from: DateTime; to: DateTime }) => {
    dispatch(
      changeSelectedRange({
        from: selectedRange.from.toFormat('yyyy-MM-dd') || '',
        to: selectedRange.to.toFormat('yyyy-MM-dd') || '',
      })
    );

    // TODO: find a way to trigger getBookings automatically after ChangeSelectedRange is dispatched
    dispatch(getBookings());
  };

  return (
    <>
      <div className="flex justify-between">
        <div>
          <RangeSelector selectedRangeChanged={changeRange} />
        </div>

        <div>
          <IconButton aria-label="add new booking" size="large" onClick={handleAddNewBooking}>
            <AddIcon />
          </IconButton>
        </div>
      </div>
      {createBookingOpen && <CreateBookingDialog open={createBookingOpen} handleClose={handleNewBookingClose} />}
    </>
  );
};
