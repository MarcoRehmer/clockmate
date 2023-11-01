import { useEffect, useState } from 'react';
import { Menu, MenuItem } from '@mui/material';

export const RowMenu = (props: { anchor: HTMLElement | null }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => setAnchorEl(props.anchor), [props.anchor]);

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Menu
      id="row-menu"
      anchorEl={props.anchor}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={handleClose}>Edit</MenuItem>
      <MenuItem onClick={handleClose}>Delete</MenuItem>
    </Menu>
  );
};
