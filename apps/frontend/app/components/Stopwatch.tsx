import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import { IconButton } from '@mui/material';

export const Stopwatch = () => {
  return (
    <div style={{ display: 'flex' }}>
      <p>01:45:23</p>
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
