import React from 'react';
import { BookingTable } from './components/BookingTable/BookingTable';
import { Box, Card } from '@mui/material';
import { BookingTableOptions } from './components/BookingTableOptions/BookingTableOptions';
import { UserSummaryCard } from '@/app/(root)/dashboard/components/UserSummaryCard';
import { CurrentRunningCard } from '@/app/(root)/dashboard/components/CurrentRunningCard';
import useMediaQuery from '@mui/material/useMediaQuery';

export default async function Index() {
  return (
    <div
      style={{
        marginTop: -60,
      }}
    >
      <Box
        className="flex mb-4 gap-4"
        sx={{
          '@media (max-width: 780px)': {
            flexWrap: 'wrap',
          },
        }}
      >
        <div className="grow">
          <UserSummaryCard />
        </div>
        <Box
          sx={{
            '@media (max-width:780px)': {
              flexGrow: 1,
            },
          }}
        >
          <CurrentRunningCard />
        </Box>
      </Box>

      <Card>
        <BookingTableOptions />
        <BookingTable />
      </Card>
    </div>
  );
}
