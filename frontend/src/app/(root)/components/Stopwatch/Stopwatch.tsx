'use client';
// import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import StopIcon from '@mui/icons-material/Stop';
import { Box, Button, IconButton, Popover, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { DateTime } from 'luxon';
import { Activity } from '@/app/core/types';

export const Stopwatch = (props: { currentActivity: Activity | undefined }) => {
  const [currentTime, setCurrentTime] = useState('00:00:00');
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<null | HTMLElement>(null);
  const [remarks, setRemarks] = useState('');
  const [popoverMode, setPopoverMode] = useState<'start' | 'switch'>('start');

  const popoverOpen = Boolean(popoverAnchorEl);

  // useEffect(() => {
  //   // const interval = setInterval(() => {
  //   //   const now = DateTime.now();
  //   //   const diff = now.diff(currentActiveBooking?.startedAt ?? now, 'seconds');
  //   //   setCurrentTime(diff.toFormat('hh:mm:ss'));
  //   // }, 1000);
  //
  //   return () => clearInterval(interval);
  // }, [currentActiveBooking]);

  const handleStartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    resetForm();
    setPopoverMode('start');
    setPopoverAnchorEl(event.currentTarget);
  };

  const handleRunStopwatchClick = () => {
    // stop current task first
    // currentActiveBooking &&
    //   dispatch(editBooking({ bookingId: currentActiveBooking.id, partialBooking: { finishedAt: DateTime.now() } }));

    // start the new task
    // dispatch(addBooking({ startedAt: DateTime.now(), remarks }));
    handlePopoverClose();
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  const handleStopClick = () => {
    // currentActiveBooking &&
    //   dispatch(editBooking({ bookingId: currentActiveBooking.id, partialBooking: { finishedAt: DateTime.now() } }));
  };

  const handleSwitchTaskClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    resetForm();
    setPopoverMode('switch');
    setPopoverAnchorEl(event.currentTarget);
  };

  const handleDiscardClick = () => {
    // TODO: implement confirm dialog
    // currentActiveBooking && dispatch(deleteBooking(currentActiveBooking.id));
  };

  const resetForm = () => {
    setRemarks('');
  };

  return (
    <>
      <div>
        {props.currentActivity !== undefined ? (
          <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ alignSelf: 'center', color: 'primary.main' }}>{currentTime}</Typography>

            <Box>
              <IconButton sx={{ color: 'text.primary' }} onClick={handleStopClick} aria-label="stop">
                <StopIcon />
              </IconButton>
              <IconButton
                sx={{ color: 'text.primary' }}
                onClick={handleSwitchTaskClick}
                aria-label="change task"
                size="large"
              >
                <CallSplitIcon style={{ rotate: '90deg' }} />
              </IconButton>
              <IconButton sx={{ color: 'text.primary' }} onClick={handleDiscardClick} aria-label="discard">
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        ) : (
          <IconButton sx={{ color: 'text.primary' }} onClick={handleStartClick} aria-label="start">
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
