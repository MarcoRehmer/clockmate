'use client';
import { Avatar, Card } from '@mui/material';
import Typography from '@mui/material/Typography';

export const UserSummaryCard = () => {
  return (
    <Card sx={{ background: 'linear-gradient(to bottom, #d9f4f4, #ebf9f9)' }}>
      <div className="flex">
        <Avatar sx={{ width: 64, height: 64, marginRight: 4 }} />
        <div>
          <Typography fontSize="large" sx={{ marginBottom: 1 }}>
            Good Morning, User
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Today: 3h 50min</Typography>
        </div>
      </div>
    </Card>
  );
};
