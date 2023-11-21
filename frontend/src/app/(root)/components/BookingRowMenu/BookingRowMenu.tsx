import { Menu, MenuItem } from '@mui/material';

export const BookingRowMenu = ({
  anchorEl,
  setAnchor,
  handleRowAction,
}: {
  anchorEl: HTMLElement | null;
  setAnchor: (anchor: HTMLElement | null) => void;
  handleRowAction: (action: 'edit' | 'delete') => void;
}) => {
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchor(null);
  };

  const handleEdit = () => {
    handleRowAction('edit');
    handleClose();
  };
  const handleDelete = () => {
    handleRowAction('delete');
    handleClose();
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        id="row-menu"
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};
