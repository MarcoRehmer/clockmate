import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React, { useState } from 'react';

export const PageSizeSelect = () => {
  const [pageSize, setPageSize] = useState('25');

  const handlePageSizeChange = (event: SelectChangeEvent) => {
    setPageSize(event.target.value);
  };

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="page-size-select-label">Page Size</InputLabel>
      <Select
        labelId="page-size-select-label"
        id="page-size-select"
        value={pageSize}
        onChange={handlePageSizeChange}
        label="Page Size"
      >
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={25}>25</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={100}>100</MenuItem>
      </Select>
    </FormControl>
  );
};
