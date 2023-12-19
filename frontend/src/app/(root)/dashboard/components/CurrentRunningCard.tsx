import { Card, IconButton } from '@mui/material';
import { Stopwatch } from '../../components/Stopwatch/Stopwatch';
import Typography from '@mui/material/Typography';
import { KeyboardArrowDown } from '@mui/icons-material';

export const CurrentRunningCard = () => {
  return (
      // TODO: optimize styles, no magic numbers here
    <Card sx={{ pl: 5 }}>
      <Stopwatch />
      <div className="flex">
        <Typography sx={{ alignSelf: 'center', color: 'text.secondary' }} className="grow">
          Lorem Ipsum dolor
        </Typography>
        <IconButton>
          <KeyboardArrowDown />
        </IconButton>
      </div>
    </Card>
  );
};
