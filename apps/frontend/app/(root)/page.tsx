import React from 'react';
import { RangeSelector } from './components/RangeSelector';
import { BookingTable } from './components/BookingTable';
import { Pagination } from '@mui/material';
import styles from './page.module.scss';

export default async function Index() {
  return (
    <div>
      <RangeSelector />
      <BookingTable />
      <div className={styles['pagination-container']}>
        <Pagination />
      </div>
    </div>
  );
}
