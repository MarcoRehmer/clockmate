'use client';
import { Avatar, Box, Card } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { DateTime } from 'luxon';
import { UserSummary } from '@/app/core/types';

export const UserSummaryCard = (props: { summary: UserSummary }) => {
  const greeterText =
    DateTime.now() < DateTime.fromObject({ hour: 12 })
      ? 'Good Morning'
      : DateTime.now() > DateTime.fromObject({ hour: 17 })
      ? 'Good Evening'
      : 'Hello';

  const formatSummaryValue = (value: { hours: number; minutes: number }): string =>
    `${value.hours || 0}:${`${value.minutes || 0}`.padEnd(2, '0')}`;

  return (
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
                <Typography sx={{ color: 'text.secondary' }}>{formatSummaryValue(props.summary.today)} h</Typography>
              </div>
              <div className="flex gap-2">
                <Typography sx={{ color: 'text.primary' }}>Week:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{formatSummaryValue(props.summary.week)} h</Typography>
              </div>
              <div className="flex gap-2">
                <Typography sx={{ color: 'text.primary' }}>Month:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{formatSummaryValue(props.summary.month)} h</Typography>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Card>
  );
};
