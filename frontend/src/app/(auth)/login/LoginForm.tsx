import {
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const LoginForm = ({
  loginRequested,
  errorMessage,
}: {
  loginRequested: (email: string, password: string) => void;
  errorMessage: string | undefined;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emptyUsernameError, setEmptyUsernameError] = useState(false);
  const [emptyPasswordError, setEmptyPasswordError] = useState(false);

  const onLoginSubmitted = () => {
    const emailEmpty = email.trim().length === 0;
    const passwordEmpty = password.trim().length === 0;

    setEmptyUsernameError(emailEmpty);
    setEmptyPasswordError(passwordEmpty);

    if (!emailEmpty && !passwordEmpty) {
      loginRequested(email, password);
    }
  };

  return (
    <>
      <FormGroup onKeyDown={({ key }) => key === 'Enter' && onLoginSubmitted()}>
        <FormHelperText error={!errorMessage}>{errorMessage}</FormHelperText>
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
          <FormControl variant="standard" error={emptyUsernameError}>
            <InputLabel htmlFor="email">E-Mail</InputLabel>
            <Input
              id="email"
              autoComplete="username"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
          </FormControl>
          <FormControl variant="standard" error={emptyPasswordError}>
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
          <Button onClick={onLoginSubmitted}>Login</Button>
        </div>
      </FormGroup>
    </>
  );
};
