'use client';
// import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import StopIcon from '@mui/icons-material/Stop';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/store/store';
import { addBooking } from '@/app/store/bookings/slices/addBooking';
import { DateTime } from 'luxon';
import { selectCurrentActiveBooking } from '@/app/store/bookings/bookingSelectors';
import { editBooking } from '@/app/store/bookings/slices/editBooking';

export const Stopwatch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentActiveBooking = useSelector(selectCurrentActiveBooking);

  const [currentTime, setCurrentTime] = useState('00:00:00');

  const handleStartClick = () => {
    console.log('start clicked');
    dispatch(addBooking({ startedAt: DateTime.now(), remarks: 'started from stopwatch' }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = DateTime.now();
      const diff = now.diff(currentActiveBooking?.startedAt ?? now, 'seconds');
      setCurrentTime(diff.toFormat('hh:mm:ss'));
    }, 1000);

    return () => clearInterval(interval);
  }, [currentActiveBooking]);

  // const handlePauseClick = () => {
  //   console.log('pause clicked');
  // };

  const handleStopClick = () => {
    currentActiveBooking &&
      dispatch(editBooking({ bookingId: currentActiveBooking.id, partialBooking: { finishedAt: DateTime.now() } }));
  };

  const handleSwitchTaskClick = () => {
    console.log('switch project clicked');
  };

  const handleDiscardClick = () => {
    console.log('discard clicked');
  };

  return (
    <div style={{ display: 'flex' }}>
      <p>{currentTime}</p>
      {currentActiveBooking !== undefined ? (
        <>
          {/* <IconButton onClick={handlePauseClick} aria-label="pause" size="large" color="inherit">
            <PauseIcon />
          </IconButton> */}

          <IconButton onClick={handleStopClick} aria-label="stop" size="large" color="inherit">
            <StopIcon />
          </IconButton>
          <IconButton onClick={handleSwitchTaskClick} aria-label="change task" size="large" color="inherit">
            <CallSplitIcon style={{ rotate: '90deg' }} />
          </IconButton>
          <IconButton onClick={handleDiscardClick} aria-label="discard" size="large" color="inherit">
            <CloseIcon />
          </IconButton>
        </>
      ) : (
        <IconButton onClick={handleStartClick} aria-label="start" size="large" color="inherit">
          <PlayArrowIcon />
        </IconButton>
      )}
    </div>
  );
};
