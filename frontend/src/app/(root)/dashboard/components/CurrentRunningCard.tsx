'use client';
import { Box, Card, IconButton, Popover } from '@mui/material';
import { Stopwatch } from '../../components/Stopwatch/Stopwatch';
import Typography from '@mui/material/Typography';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import {Activity} from "@/app/core/types";

export const CurrentRunningCard = (props: {currentActivity: Activity | undefined}) => {
  const [detailAnchorEl, setDetailAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(detailAnchorEl);

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
        <Box sx={{ p: 2, minWidth: 300, display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ color: 'text.main' }} className="grow">
            Remarks
          </Typography>
          <Typography sx={{ color: 'text.secondary' }} className="grow">
            {props.currentActivity?.remarks}
          </Typography>

          <IconButton sx={{ alignSelf: 'flex-end' }} onClick={() => console.log('edit')}>
            <EditIcon />
          </IconButton>
        </Box>
      </Popover>
    </Card>
  );
};
