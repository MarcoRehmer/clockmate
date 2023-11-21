import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const RangeSelector = () => {
  return (
    <div>
      {false && (
        <IconButton aria-label="column config" size="large" color="inherit">
          <MoreVertIcon />
        </IconButton>
      )}
      <IconButton aria-label="previous entry" size="large" color="inherit">
        <ChevronLeftIcon />
      </IconButton>
      Januar 2023
      <IconButton aria-label="next entry" size="large" color="inherit">
        <ChevronRightIcon />
      </IconButton>
    </div>
  );
};
