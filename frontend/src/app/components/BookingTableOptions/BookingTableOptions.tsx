'use client';
import { RangeSelector } from '../../(root)/components/RangeSelector';
import { IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import styles from './booking-table-options.module.scss';

export const BookingTableOptions = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const addPopoverOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const id = addPopoverOpen ? 'simple-popper' : undefined;
  return (
    <>
      <div className={styles['booking-table-options-container']}>
        <div>
          <RangeSelector />
        </div>

        <div>
          <IconButton aria-label="open filter" size="large" color="inherit">
            <FilterListIcon />
          </IconButton>

          <IconButton
            aria-label="add new booking"
            size="large"
            color="inherit"
            onClick={handleClick}
            id={id}
          >
            <AddIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};
