import {
  Box,
  Button,
  CircularProgress,
  FilledInput,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const LoginForm = ({ loginRequested }: { loginRequested: (email: string, password: string) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <form>
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
          <FormControl variant="standard">
            <InputLabel htmlFor="email">E-Mail</InputLabel>
            <Input
              id="email"
              autoComplete="username"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              autoComplete="current-password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            ></Input>
          </FormControl>
            <Button onClick={() => loginRequested(email, password)}>Login</Button>
        </div>
      </form>
    </>
  );
};
