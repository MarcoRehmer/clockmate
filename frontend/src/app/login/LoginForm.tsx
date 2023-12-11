import { Button, TextField } from '@mui/material';
import { api } from '@/app/api/api';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export const LoginForm = ({ loginRequested }: { loginRequested: (email: string, password: string) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        E-Mail
        <TextField id="email" onChange={(event) => setEmail(event.target.value)} value={email} />
        Password
        <TextField
          id="password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <Button onClick={() => loginRequested(email, password)}>Login</Button>
      </div>
    </>
  );
};
