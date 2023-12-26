'use client';
import { Avatar, Box, Card } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { DateTime } from 'luxon';

export const UserSummaryCard = () => {
  const greeterText =
    DateTime.now() < DateTime.fromObject({ hour: 12 })
      ? 'Good Morning'
      : DateTime.now() > DateTime.fromObject({ hour: 17 })
      ? 'Good Evening'
      : 'Hello';

  return (
    //background: 'linear-gradient(to bottom, #ebf9f9, #fff)',
    <Card sx={{ pt: 8, pb: 10 }}>
      <Box sx={{ mt: 2, mb: 2 }}>
        <div className="flex">
          <Avatar sx={{ width: 64, height: 64, mr: 4 }} />
          <div className="flex flex-col justify-between">
            <Typography fontSize="large" sx={{ marginBottom: 1 }}>
              {greeterText}, User
            </Typography>

            {/*summary values*/}
            <div className="flex gap-x-8 flex-wrap">
              <div className="flex gap-2">
                <Typography sx={{ color: 'text.primary' }}>Today:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>0:00 h</Typography>
              </div>
              <div className="flex gap-2">
                <Typography sx={{ color: 'text.primary' }}>Week:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>0:00 h</Typography>
              </div>
              <div className="flex gap-2">
                <Typography sx={{ color: 'text.primary' }}>Month:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>0:00 h</Typography>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Card>
  );
};
