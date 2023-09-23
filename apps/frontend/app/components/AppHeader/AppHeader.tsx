import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Stopwatch } from '../Stopwatch/Stopwatch';
import { Avatar } from '@mui/material';

export const AppHeader = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Clockmate
        </Typography>
        <Stopwatch />
        <Avatar />
      </Toolbar>
    </AppBar>
  );
};
