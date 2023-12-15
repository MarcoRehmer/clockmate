'use client';
// import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import StopIcon from '@mui/icons-material/Stop';
import { Box, Button, IconButton, Popover, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/store/store';
import { addBooking } from '@/app/store/bookings/slices/addBooking';
import { DateTime } from 'luxon';
import { selectCurrentActiveBooking } from '@/app/store/bookings/bookingSelectors';
import { editBooking } from '@/app/store/bookings/slices/editBooking';
import { deleteBooking } from '@/app/store/bookings/slices/deletBooking';

export const Stopwatch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentActiveBooking = useSelector(selectCurrentActiveBooking);

  const [currentTime, setCurrentTime] = useState('00:00:00');
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<null | HTMLElement>(null);
  const [remarks, setRemarks] = useState('');
  const [popoverMode, setPopoverMode] = useState<'start' | 'switch'>('start');

  const popoverOpen = Boolean(popoverAnchorEl);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = DateTime.now();
      const diff = now.diff(currentActiveBooking?.startedAt ?? now, 'seconds');
      setCurrentTime(diff.toFormat('hh:mm:ss'));
    }, 1000);

    return () => clearInterval(interval);
  }, [currentActiveBooking]);

  const handleStartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    resetForm();
    setPopoverMode('start');
    setPopoverAnchorEl(event.currentTarget);
  };

  const handleRunStopwatchClick = () => {
    // stop current task first
    currentActiveBooking &&
      dispatch(editBooking({ bookingId: currentActiveBooking.id, partialBooking: { finishedAt: DateTime.now() } }));

    // start the new task
    dispatch(addBooking({ startedAt: DateTime.now(), remarks }));
    handlePopoverClose();
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  const handleStopClick = () => {
    currentActiveBooking &&
      dispatch(editBooking({ bookingId: currentActiveBooking.id, partialBooking: { finishedAt: DateTime.now() } }));
  };

  const handleSwitchTaskClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    resetForm();
    setPopoverMode('switch');
    setPopoverAnchorEl(event.currentTarget);
  };

  const handleDiscardClick = () => {
    // TODO: implement confirm dialog
    currentActiveBooking && dispatch(deleteBooking(currentActiveBooking.id));
  };

  const resetForm = () => {
    setRemarks('');
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        {currentActiveBooking !== undefined ? (
          <>
            <Typography sx={{alignSelf: 'center'}}>{currentTime}</Typography>

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

      <Popover
        open={popoverOpen}
        onClose={handlePopoverClose}
        anchorEl={popoverAnchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Typography sx={{ p: 2, pb: 0 }} variant="h6">
          {popoverMode === 'switch' ? 'Switch Task' : 'Start Task'}
        </Typography>
        <Box sx={{ p: 2, pt: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <TextField placeholder="Remarks" value={remarks} onChange={(event) => setRemarks(event.target.value)} />
          <Button onClick={handleRunStopwatchClick}>{popoverMode === 'start' ? 'Start' : 'Switch'}</Button>
        </Box>
      </Popover>
    </>
  );
};
