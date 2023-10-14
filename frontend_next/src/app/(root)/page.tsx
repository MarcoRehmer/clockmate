import React from 'react';
import { BookingTable } from './components/BookingTable';
import { Card } from '@mui/material';
import { BookingTableOptions } from '@/app/(root)/components/BookingTableOptions/BookingTableOptions';

export default async function Index() {
  return (
    <div>
      <Card>
        <BookingTableOptions />
        <BookingTable />
      </Card>
    </div>
  );
}
