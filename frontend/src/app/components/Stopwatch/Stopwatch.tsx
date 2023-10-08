'use client';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useContext } from 'react';
import { ApiContext } from '@/app/provider/api.context';

export const Stopwatch = () => {
  const dispatch = useDispatch();
  const api = useContext(ApiContext);

  return (
    <div style={{ display: 'flex' }}>
      <p>00:00:00</p>
      <IconButton aria-label="pause" size="large" color="inherit">
        <PauseIcon />
      </IconButton>
      <IconButton aria-label="start" size="large" color="inherit">
        <PlayArrowIcon />
      </IconButton>
      <IconButton aria-label="change task" size="large" color="inherit">
        <CallSplitIcon style={{ rotate: '90deg' }} />
      </IconButton>
      <IconButton aria-label="discard" size="large" color="inherit">
        <CloseIcon />
      </IconButton>
    </div>
  );
};
