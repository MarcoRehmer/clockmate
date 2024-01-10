import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, IconButton } from '@mui/material';
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
    <Box sx={{ display: 'flex' }}>
      <IconButton aria-label="previous entry" onClick={previousMonth}>
        <ChevronLeftIcon />
      </IconButton>
      <Typography sx={{ alignSelf: 'center', textAlign: 'center', color: 'text.secondary', width: 124 }}>
        {selectedMonth.toFormat('LLLL yyyy')}
      </Typography>

      <IconButton aria-label="next entry" onClick={nextMonth}>
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
};
