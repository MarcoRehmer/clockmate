import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { DateTime } from 'luxon';
import Typography from '@mui/material/Typography';

export const RangeSelector = ({
  selectedRangeChanged,
}: {
  selectedRangeChanged: (range: { from: DateTime; to: DateTime }) => void;
}) => {
  const [selectedMonth, setSelectedMonth] = useState(DateTime.now().startOf('month'));

  const nextMonth = () => {
    const newMonth = selectedMonth.plus({ months: 1 });
    setSelectedMonth(newMonth);
    selectedRangeChanged({ from: newMonth.startOf('month'), to: newMonth.endOf('month') });
  };

  const previousMonth = () => {
    const newMonth = selectedMonth.minus({ months: 1 });
    setSelectedMonth(newMonth);

    selectedRangeChanged({ from: newMonth.startOf('month'), to: newMonth.endOf('month') });
  };

  return (
    <div className="flex">
      <IconButton aria-label="previous entry" size="large" color="inherit" onClick={previousMonth}>
        <ChevronLeftIcon />
      </IconButton>
      <Typography sx={{ alignSelf: 'center', color: 'text.secondary' }}>
        {selectedMonth.toFormat('LLLL yyyy')}
      </Typography>

      <IconButton aria-label="next entry" size="large" color="inherit" onClick={nextMonth}>
        <ChevronRightIcon />
      </IconButton>
    </div>
  );
};
