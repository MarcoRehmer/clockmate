import { Button, TextField } from '@mui/material';
import { api } from '@/app/api/api';
import { redirect } from 'next/navigation';

export const LoginForm = ({ loginRequested }: {loginRequested: (username: string, password: string) => void}) => {

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        Username
        <TextField id="username" />
        Password
        <TextField id="password" type="password" />
        <Button onClick={() => loginRequested('admin', 'admin')}>Login</Button>
      </div>
    </>
  );
};
