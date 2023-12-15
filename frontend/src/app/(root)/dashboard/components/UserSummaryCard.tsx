'use client';
import { Avatar, Card } from '@mui/material';
import Typography from '@mui/material/Typography';

export const UserSummaryCard = () => {
  return (
    <Card sx={{ background: 'linear-gradient(to bottom, #ebf9f9, #fff)', pt: 4, pb: 4 }}>
      <div className="flex">
        <Avatar sx={{ width: 64, height: 64, marginRight: 4 }} />
        <div>
          <Typography fontSize="large" sx={{ marginBottom: 1 }}>
            Good Morning, User
          </Typography>
          <div className="flex gap-8">
            <div className="flex gap-2">
              <Typography sx={{ color: 'text.primary' }}>Today:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>3h 50min</Typography>
            </div>
            <div className="flex gap-2">
              <Typography sx={{ color: 'text.primary' }}>Week:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>25h 30min</Typography>
            </div>
            <div className="flex gap-2">
              <Typography sx={{ color: 'text.primary' }}>Month:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>120h 45min</Typography>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
