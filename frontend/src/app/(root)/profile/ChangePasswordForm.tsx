import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useState } from 'react';

interface ChangePasswordFormProps {
  onPasswordChanged: (
    currentPassword: string,
    newPassword: string
  ) => Promise<{ success: true } | { success: false; wrongCurrentPassword: boolean }>;
}

export const ChangePasswordForm = ({ onPasswordChanged }: ChangePasswordFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordAgain, setNewPasswordAgain] = useState('');
  const [isPasswordMissmatch, setIsPasswordMissmatch] = useState(false);
  const [isWrongCurrentPassword, setIsWrongCurrentPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDiscardChanges = () => {
    setIsEditing(false);
  };

  const handleSaveChanges = async () => {
    if (oldPassword.trim().length === 0) {
      setIsWrongCurrentPassword(true);
      return;
    }

    if (newPassword !== newPasswordAgain) {
      setIsPasswordMissmatch(true);
      return;
    }

    setIsWrongCurrentPassword(false);
    setIsPasswordMissmatch(false);
    setIsLoading(true);

    const result = await onPasswordChanged(oldPassword, newPassword);
    if (result.success === false) {
      setIsWrongCurrentPassword(result.wrongCurrentPassword);
    } else {
      setIsEditing(false);
    }

    setIsLoading(false);
  };

  return (
    <>
      {isEditing ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1 }}>
          <TextField
            error={isWrongCurrentPassword}
            id="current-password"
            label="current password"
            value={oldPassword}
            variant="standard"
            type="password"
            onChange={(event) => setOldPassword(event.target.value)}
          />
          <TextField
            label="new password"
            variant="standard"
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
          <TextField
            error={isPasswordMissmatch}
            label="new password again"
            variant="standard"
            type="password"
            value={newPasswordAgain}
            onChange={(event) => setNewPasswordAgain(event.target.value)}
          />
          <Box sx={{ display: 'flex', columnGap: 1 }}>
            <Button onClick={handleDiscardChanges} disabled={isLoading}>
              Abort
            </Button>
            <Button onClick={handleSaveChanges} disabled={isLoading}>
              Save
            </Button>
            {isLoading && <CircularProgress size={24} />}
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography fontSize="small">Password</Typography>
          <Typography fontSize="large" color="text.secondary">
            ************
          </Typography>
          <Button onClick={() => setIsEditing(true)}>Change Password</Button>
        </Box>
      )}
    </>
  );
};
