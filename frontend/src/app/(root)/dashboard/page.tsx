import React from 'react';
import { BookingTable } from './components/BookingTable/BookingTable';
import { Card } from '@mui/material';
import { BookingTableOptions } from './components/BookingTableOptions/BookingTableOptions';
import { UserSummaryCard } from '@/app/(root)/dashboard/components/UserSummaryCard';

export default async function Index() {
  return (
    <div style={{ marginTop: -60 }}>
      <div className="flex mb-4 gap-4">
        <div className="grow">
          <UserSummaryCard />
        </div>
        <div>
          <UserSummaryCard />
        </div>
      </div>

      <Card>
        <BookingTableOptions />
        <BookingTable />
      </Card>
    </div>
  );
}
