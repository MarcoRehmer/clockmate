'use client';
import { Box, Card, IconButton, Popover } from '@mui/material';
import { Stopwatch } from '../../components/Stopwatch/Stopwatch';
import Typography from '@mui/material/Typography';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { selectCurrentActiveBooking } from '@/app/store/bookings/bookingSelectors';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';

export const CurrentRunningCard = () => {
  const [detailAnchorEl, setDetailAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(detailAnchorEl);

  const currentActiveBooking = useSelector(selectCurrentActiveBooking);

  const openDetails = (target: HTMLButtonElement) => {
    setDetailAnchorEl(target);
  };

  const closeDetails = () => {
    setDetailAnchorEl(null);
  };

  return (
    <Card sx={{ width: 300 }}>
      <Stopwatch />
      <div className="flex">
        <Typography
          sx={{
            alignSelf: 'center',
            color: 'text.secondary',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          className="grow"
        ></Typography>
        <IconButton onClick={(event) => openDetails(event.currentTarget)}>
          <KeyboardArrowDown />
        </IconButton>
      </div>

      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        anchorEl={detailAnchorEl}
        onClose={closeDetails}
      >
        <Box sx={{ p: 2, width: 400, display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ color: 'text.main' }} className="grow">
            Remarks
          </Typography>
          <Typography sx={{ color: 'text.secondary' }} className="grow">
            {currentActiveBooking?.remarks}
          </Typography>

          <IconButton sx={{ alignSelf: 'flex-end' }} onClick={() => console.log('edit')}>
            <EditIcon />
          </IconButton>
        </Box>
      </Popover>
    </Card>
  );
};
