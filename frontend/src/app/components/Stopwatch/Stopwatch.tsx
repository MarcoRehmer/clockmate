'use client';
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { incrementStopwatch, resetStopwatch, selectStopwatch } from "../../store/slices/bookingsSlice";

export const Stopwatch = () => {
  const stopwatchState = useSelector(selectStopwatch);
  const dispatch = useDispatch();

  return (
    <div style={{ display: 'flex' }}>
      <p>{stopwatchState || 'NaN'}</p>
      <IconButton
        aria-label="pause"
        size="large"
        color="inherit"
        onClick={() => dispatch(resetStopwatch())}
      >
        <PauseIcon />
      </IconButton>
      <IconButton
        aria-label="start"
        size="large"
        color="inherit"
        onClick={() => dispatch(incrementStopwatch(1))}
      >
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
