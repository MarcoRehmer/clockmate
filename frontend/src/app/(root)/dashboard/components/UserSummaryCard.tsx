'use client';
import { Avatar, Box, Card, Skeleton } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { DateTime } from 'luxon';
import { UserSummary } from '@/app/core/types';

export const UserSummaryCard = (props: { summary: UserSummary; loading: boolean }) => {
  const greeterText =
    DateTime.now() < DateTime.fromObject({ hour: 12 })
      ? 'Good Morning'
      : DateTime.now() > DateTime.fromObject({ hour: 17 })
      ? 'Good Evening'
      : 'Hello';

  const formatSummaryValue = (value: { hours: number; minutes: number }): string =>
    `${value.hours || 0}:${`${value.minutes || 0}`.padStart(2, '0')}`;

  return (
    <Card sx={{ pt: 8, pb: 10 }}>
      <Box sx={{ mt: 2, mb: 2 }}>
        <Box sx={{ display: 'flex' }}>
          {props.loading ? (
            <Skeleton variant="circular" sx={{ width: 64, height: 64, mr: 4 }} />
          ) : (
            <Avatar sx={{ width: 64, height: 64, mr: 4 }} />
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
            <Typography fontSize="large" sx={{ marginBottom: 1 }}>
              {greeterText}, User
            </Typography>

            {/*summary values*/}
            <Box sx={{ display: 'flex', columnGap: 4, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', columnGap: 1 }}>
                <Typography sx={{ color: 'text.primary' }}>Today:</Typography>
                {props.loading ? (
                  <Skeleton variant="text" sx={{ width: 60 }} />
                ) : (
                  <Typography sx={{ color: 'text.secondary' }}>{formatSummaryValue(props.summary.today)} h</Typography>
                )}
              </Box>
              <Box sx={{ display: 'flex', columnGap: 1 }}>
                <Typography sx={{ color: 'text.primary' }}>Week:</Typography>
                {props.loading ? (
                  <Skeleton variant="text" sx={{ width: 60 }} />
                ) : (
                  <Typography sx={{ color: 'text.secondary' }}>{formatSummaryValue(props.summary.week)} h</Typography>
                )}
              </Box>
              <Box sx={{ display: 'flex', columnGap: 1 }}>
                <Typography sx={{ color: 'text.primary' }}>Month:</Typography>
                {props.loading ? (
                  <Skeleton variant="text" sx={{ width: 60 }} />
                ) : (
                  <Typography sx={{ color: 'text.secondary' }}>{formatSummaryValue(props.summary.month)} h</Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};
